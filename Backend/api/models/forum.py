from datetime import datetime
from enum import IntEnum
from bson import ObjectId

from typing import List, Optional, Dict
from fastapi import File
from pydantic import BaseModel, Field

from api.models.objectid import PyObjectId

class ForumCommentModel(BaseModel):
    comment: str = Field(...)
    user_id : str = Field(...)
    date : datetime = Field(...)

class ForumModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title : str = Field(...)
    user_id : str = Field(...)
    date : datetime = Field(...)
    comment : Optional[List[ForumCommentModel]] = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}