from fastapi import FastAPI

from api.routers.user import user
from api.routers.content import content
from api.routers.forum import forum
from api.routers.recommendation import recommendation
from api.routers.quiz import quiz
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(openapi_url="/api/v1/openapi.json", docs_url="/api/v1/docs")

origins = [

    "http://localhost:4200",
    "http://127.0.0.1:4200",
    "http://localhost:8000",
    "http://localhost:3000",
    "http://localhost",
    "*"

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

app.include_router(user, prefix='/api/v1', tags=['user'])
app.include_router(content, prefix='/api/v1', tags=['content'])
app.include_router(forum, prefix='/api/v1', tags=['forum'])
app.include_router(quiz, prefix='/api/v1', tags=['quiz'])
app.include_router(recommendation, prefix='/api/v1', tags=['recommendation'])