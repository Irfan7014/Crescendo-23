from datetime import datetime
from typing import Dict, List, Optional
from fastapi import APIRouter, Body, Depends, Query, UploadFile, File
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from fastapi import status, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from api.models.objectid import PyObjectId
from api.services.forum import create_comment_service, create_forum_service, get_comment_service_by_user, get_forum_service, get_forum_service_by_user
from api.models.forum import ForumCommentModel
from api.models.forum import ForumModel
from sqlalchemy import false

from api.db.db_config import db, s3
from api.models.user import UserActivityModel, UserModel, UserTypeEnum
from api.models.user import UserRegisterModel, CurrentUser
from api.services.auth import authHandler
from api.services.user import get_user_service
import json

forum = APIRouter()

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

@forum.post('/postThread')
async def createThread(title : str = Query(...),
        db = Depends(get_db),
        current_user: CurrentUser = Depends(get_current_user)):
    user = await get_user_service(db, current_user.username)
    thread = jsonable_encoder(
        ForumModel(
            title =title,
            date =datetime.utcnow(),
            user_id= user['_id'],
            comment =  None,
        ))
    created_thread = await create_forum_service(db, thread)
    return created_thread

@forum.patch('/postComment')
async def createComment(comment: str = Query(...),
                       thread_id: str = Query(...),
        db = Depends(get_db),
        current_user: CurrentUser = Depends(get_current_user)):
    user = await get_user_service(db, current_user.username)
    print('here')
    forum = await get_forum_service(db, thread_id)
    comments = forum['comment']
    comm = jsonable_encoder(
        ForumCommentModel(
            user_id= user['_id'],
            date =datetime.utcnow(),
            comment = comment
        ))
    forum = {}
    if comments is None:
        comments = []
    comments.append(comm)
    forum['comment'] = comments
    created_comment = await create_comment_service(db, forum, thread_id)
    return created_comment

@forum.get('/getThread')
async def getThread(
        thread_id : str = Query(...),
        db = Depends(get_db),
        current_user: CurrentUser = Depends(get_current_user)):
    user = await get_user_service(db, current_user.username)
    forum = await get_forum_service(db, thread_id)
    return forum

@forum.get('/getThreadByUser')
async def getThreadByUser(
        user_id : str = Query(...),
        db = Depends(get_db),
        current_user: CurrentUser = Depends(get_current_user)):
    user = await get_user_service(db, current_user.username)
    forum = await get_forum_service_by_user(db, user_id)
    return forum

@forum.get('/getCommentByUser')
async def getCommentByUser(
        user_id : str = Query(...),
        db = Depends(get_db),
        current_user: CurrentUser = Depends(get_current_user)):
    user = await get_user_service(db, current_user.username)
    forum = await get_comment_service_by_user(db, user_id)
    return forum