
from fastapi import APIRouter, Depends, Query
from fastapi.security import OAuth2PasswordBearer

from api.db.db_config import db, s3
from api.services.quiz import get_all_quiz_service, get_quiz_service



quiz = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    yield db

def get_s3():
    yield s3
    
@quiz.get('/getAllQuiz')
async def get_all_quiz(
        db = Depends(get_db),
        s3 = Depends(get_s3)
    ):
    quiz = await get_all_quiz_service(db)
    return quiz

@quiz.get('/getquiz')
async def getQuiz(
        title: str = Query(...),
        db = Depends(get_db),
        s3 = Depends(get_s3)
    ):
    quiz = await get_quiz_service(db, title)
    return quiz
