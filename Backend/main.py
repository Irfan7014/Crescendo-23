from fastapi import FastAPI

from api.routers.user import user
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