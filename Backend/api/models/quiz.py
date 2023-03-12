from datetime import datetime
from enum import IntEnum
from bson import ObjectId

from typing import List, Optional, Dict
from fastapi import File
from pydantic import BaseModel, Field

from api.models.objectid import PyObjectId

class QuestionModel(BaseModel):
    question: str = Field(...)
    options : List[str] = Field(...)
    answer : str = Field(...)

class QuizModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title : str = Field(...)
    user_id : str = Field(...)
    questions : Optional[List[QuestionModel]] = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}