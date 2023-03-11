
from datetime import datetime
from typing import Dict, List, Optional
from fastapi import APIRouter, Body, Depends, Query, UploadFile, File
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi import status, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy import false

from api.db.db_config import db, s3
from api.models.user import UserActivityModel, UserModel, UserTypeEnum
from api.models.user import UserRegisterModel, CurrentUser
from api.services.auth import authHandler
from api.services.user import create_aadhar_service, get_user_by_id_service, send_otp_service, store_document, validate_aadhar_service, update_user_service, get_all_users_service, create_user_service, get_user_service, verify_otp_service, verify_user_service
import json

user = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    yield db

def get_s3():
    yield s3

async def get_current_user(token: str = Depends(oauth2_scheme), db = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = authHandler().decode_access_token(token)
    email: str = payload.get("sub")
    claims = payload.get("claims")
    if email is None:    
        raise credentials_exception
    user = await get_user_service(db, email)
    if user is None:
        raise credentials_exception
    access_token = payload.get("access_token")
    return CurrentUser(username=user['email'], name=user['name'], access_token=access_token, claims=claims)

@user.get('/ping')
def ping():
    return 'pong'

@user.post('/register')
async def register(user: UserRegisterModel = Body(...), db = Depends(get_db)):
    existing_user = await get_user_service(db, user.email)
    if existing_user is not None:
        return JSONResponse(status_code=status.HTTP_226_IM_USED, content="User Already Exists")
    user = jsonable_encoder(
        UserModel(
            name= user.name,
            dob= datetime.strptime(user.dob, '%d-%m-%Y'),
            gender= user.gender,
            phone= user.phone,
            password= authHandler().get_pwd_hash(user.password),
            email= user.email,
            role= UserTypeEnum.student,
            activity= jsonable_encoder(
                UserActivityModel(
                content_viewed= [],
                courses_enrolled= {},
                last_active= datetime.utcnow()
            )),
            verified= False
        ))
    created_user = await create_user_service(db, user)
    return created_user

# @user.post('/registerAdmin')
# async def register_admin(user: UserRegisterModel = Body(...), db = Depends(get_db), current_user: CurrentUser = Depends(get_current_user)):
#     if current_user.claims == 'admin':
#         existing_user = await get_user_service(db, user.aadhar)
#         if existing_user is not None:
#             return JSONResponse(status_code=status.HTTP_226_IM_USED, content="User Already Exists")
#         aadhar = await validate_aadhar_service(db, user.aadhar)
#         if aadhar is None:
#             return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content="Invalid Aadhar")
#         user = jsonable_encoder(
#             UserModel(
#                 aadhar= user.aadhar,
#                 name= user.name,
#                 dob= user.dob,
#                 gender= user.gender,
#                 phone= aadhar['phone'],
#                 password= authHandler().get_pwd_hash(user.password),
#                 email= user.email,
#                 role= 'user',
#                 purpose= user.purpose,
#                 blood= user.blood,
#                 verified=False
#             ))
#         created_user = await create_user_service(db, user)
#         return created_user
#     return 'Not Admin'

@user.post('/token')
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db = Depends(get_db)):
    _user = await get_user_service(db, form_data.username)
    if not authHandler().verify_pwd(form_data.password, _user['password']):
        return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content="Password is incorrect")
    if not _user:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content="Email does not exists")
    if _user["verified"] == False:
        return JSONResponse(status_code=status.HTTP_403_FORBIDDEN, content="Not Verified User")
    print(_user)
    access_token = authHandler().encode_token(_user['email'], _user['role'])
    refresh_token = authHandler().encode_refresh_token(_user['email'])
    return JSONResponse(status_code= status.HTTP_200_OK, content={"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"})

@user.get('/getUser')
async def get_user(db= Depends(get_db), current_user: CurrentUser = Depends(get_current_user)):
    user = await get_user_service(db, current_user.username)
    return user

@user.get('/getAllUser')
async def get_all_users(db= Depends(get_db), current_user: CurrentUser = Depends(get_current_user)):
    if current_user.claims == 'admin':
        users = await get_all_users_service(db)
        return users
    return 'Not Admin'

@user.get('/getUserById')
async def get_all_users(user_id: str = Query(...), db= Depends(get_db), current_user: CurrentUser = Depends(get_current_user)):
    user = await get_user_by_id_service(db, user_id)
    return user

@user.patch('/updateUser')
async def update_user(
        password: Optional[str] = Query(None),
        email: Optional[str] = Query(None),
        content_viewed: str = Query(None),
        course_enrolled: str = Query(None),
        course_completed: str = Query(None),
        db = Depends(get_db),
        current_user: CurrentUser = Depends(get_current_user)
    ):
        
    user = {}
    if password is not None:
        user['password'] = password
    if email is not None:
        user['email'] = email    

    existing_user = await get_user_service(db, current_user.username)
    content=existing_user['activity']['content_viewed']
    if content_viewed is not None:
        content.append(content_viewed)
    courses=existing_user['activity']['courses_enrolled']
    if course_enrolled is not None:
        courses[course_enrolled] = False
    if course_completed is not None:
        courses[course_completed] = True

    activity = jsonable_encoder(
        UserActivityModel(
        content_viewed= content,
        courses_enrolled= courses,
        last_active= datetime.utcnow()
    ))
    user['activity'] = activity
    update_user = await update_user_service(db, current_user.username, user)
    return update_user


@user.post('/sendOTP')
async def send_otp(
    phone: str = Query(None)
):
    response = await send_otp_service(phone)
    return response.sid

@user.post('/verifyOTP')
async def verify_otp( db = Depends(get_db),
    phone: str = Query(None),
    code: str = Query(None)
):
    response = await verify_otp_service(phone, code)
    user = await verify_user_service(db, phone)
    return response.status

