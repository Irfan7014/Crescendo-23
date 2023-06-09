
from typing import Dict, Optional, List
from django.http import FileResponse
from fastapi import APIRouter, Body, Depends, File, Form, Query, UploadFile
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi import status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import Field
from datetime import date, datetime, timedelta

from api.db.db_config import db, s3
from api.models.content import ContentModel, ContentTypeEnum, CourseModel
from api.services.content import create_content_service, create_course_service, get_all_content_service, get_content_by_category_service, get_content_by_id_service, get_content_by_title_service, get_content_service, get_content_type_category_service, get_course_by_category_service, get_course_by_id_service, get_courses_service, jaccard_similarity, store_document, store_documents
from api.services.ocr import get_ocr_doc

from api.services.user import create_user_service
from api.models.user import  CurrentUser
from api.services.auth import authHandler
from api.services.user import get_user_service


content = APIRouter()

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

@content.post('/upload')
async def upload(
        content: UploadFile = File(...), 
        thumbnail: Optional[UploadFile] = File(None), 
        keywords: List[str] = Form(...),
        title: str = Form(...),
        category: str = Form(...),
        type: str = Form(...),
        db = Depends(get_db),
        s3 = Depends(get_s3),
        current_user: CurrentUser = Depends(get_current_user)
    ):
    keywords_list = keywords[0].split(",")
    content_url = await store_document(s3, content)
    user = await get_user_service(db, current_user.username)
    if thumbnail is not None:
        thumbnail_url = await store_document(s3, thumbnail)
    else:
        thumbnail_url = None
    content = jsonable_encoder(
        ContentModel(
            link = content_url,
            keywords = keywords_list,
            title = title,
            uploader = user['_id'],
            type = type,
            category = category,
            thumbnail = thumbnail_url,
            comment = None
        ))
    created_content = await create_content_service(db, content)
    return created_content

@content.get('/getAllContent')
async def get_all_content(
        db = Depends(get_db),
        s3 = Depends(get_s3)
    ):
    content = await get_all_content_service(db)
    return content

@content.get('/getContent')
async def get_all_content(
        type: int = Query(...),
        db = Depends(get_db),
        s3 = Depends(get_s3)
    ):
    content = await get_content_service(db, type)
    return content

@content.get('/getTypeAndContent')
async def get_all_content(
        type: int = Query(...),
        category: str = Query(...),
        db = Depends(get_db),
        s3 = Depends(get_s3)
    ):
    content = await get_content_type_category_service(db, type, category)
    return content

@content.get('/getContentByCategory')
async def get_content_by_category(
        category: str = Query(...),
        db = Depends(get_db),
        s3 = Depends(get_s3)
    ):
    content = await get_content_by_category_service(db, category)
    return content

@content.get('/getContentById')
async def get_content_by_id(
        id: str = Query(...),
        db = Depends(get_db),
        s3 = Depends(get_s3)
    ):
    content = await get_content_by_id_service(db, id)
    return content

@content.get('/getContentByTitle')
async def get_all_content(
        title: str = Query(...),
        db = Depends(get_db),
        s3 = Depends(get_s3)
    ):
    content = await get_content_by_title_service(db, title)
    return content

@content.post('/createCourse')
async def create_course(
        content: List[str] = Query(...),
        title: str = Query(...),
        db = Depends(get_db),
        s3 = Depends(get_s3)
    ):
    cont = jsonable_encoder(CourseModel(content=content, title=title))
    ret_content = await create_course_service(db, cont)
    return ret_content

@content.get('/getCourse')
async def get_course(
        db = Depends(get_db),
        s3 = Depends(get_s3)
    ):
    ret_content = await get_courses_service(db)
    return ret_content

@content.get('/getCourseById')
async def get_course_by_id(
        course_id: str = Query(...),
        db = Depends(get_db),
        s3 = Depends(get_s3)
    ):
    ret_content = await get_course_by_id_service(db, course_id)
    return ret_content

@content.get('/getCourseByCategory')
async def get_course_by_category(
        category: str = Query(...),
        db = Depends(get_db),
        s3 = Depends(get_s3)
    ):
    ret_content = await get_course_by_category_service(db, category)
    return ret_content

@content.get('/getRecommendationByTitle')
async def getRecommendation(
        title: str = Query(...),
        db = Depends(get_db),
        s3 = Depends(get_s3)
    ):
    content_1 = await get_content_by_title_service(db, title)
    content_2 = await get_content_service(db, 1)
    
    my_list_1 = content_1[0]['keywords']
    my_final_list = {}

    for index in enumerate(content_2):
        print(my_list_1)
        print(index[0])
        my_list_2 = content_2[index[0]]['keywords']
        my_string = content_2[index[0]]['title']
        tokens = my_string.split()
        print(tokens)
        print(type(tokens))
        my_list_2.extend(content_2[index[0]]['title'].split())
        my_list_2.extend(content_2[index[0]]['description'].split())
        similarity = jaccard_similarity(set(my_list_1), set(my_list_2))
        
        print(f"The Jaccard similarity between {content_1[0]['title']} and {content_2[index[0]]['title']} based on their tags is {similarity:.2f}")
        # print(content_2[index]['title'])
        my_final_list[similarity] = content_2[index[0]]['title']
        
    sorted_dict = dict(sorted(my_final_list.items()))
    print(sorted_dict)
    return sorted_dict

# @content.post('/changeStatus/{id}')
# async def change_application_status(
#         id = Query(...),
#         status = Query(...),
#         comment = Query(None),
#         db = Depends(get_db),
#         current_user: CurrentUser = Depends(get_current_user)
#     ):
#     if current_user.claims == 'admin':
#         application = {}
#         application['status'] = status
#         if comment is not None:
#             application['comment'] = comment
#         if status == 'approved':
#             appl = await get_application_by_id_service(db, id)
#             if appl['status'] != 'approved':
#                 user = await get_user_service(db, appl['aadhar'])
#                 hash = generate_certificate(s3, appl['documentAppliedFor'], user, appl)
#                 application['dateOfIssue'] = datetime.today()
#                 application['dateOfExpiry'] = datetime.today() + timedelta(days=1825)
#                 application['certificate'] = hash 
#         update_application = await update_application_service(db, id, application)
#         return update_application
#     return 'No admin priveleges'

# @application.get('/getApplicationById/{id}')
# async def get_application_by_id(
#         id = Query(...),
#         db = Depends(get_db),
#         current_user: CurrentUser = Depends(get_current_user)
#     ):
#     application = await get_application_by_id_service(db, id)
#     return application

# @application.get('/getApplicationByUser')
# async def get_application_by_user(
#         aadhar: int = Query(...),
#         db = Depends(get_db),
#         current_user: CurrentUser = Depends(get_current_user)
#     ):
#     application = await get_application_by_user_service(db, aadhar)
#     return application

# @application.get('/fetchDocuments')
# async def fetch_issued_documents(
#         db = Depends(get_db),
#         current_user: CurrentUser = Depends(get_current_user)
#     ):
#     application = await fetch_documents_service(db, current_user.aadhar)
#     return application
    
