from enum import IntEnum
from bson import ObjectId

from typing import List, Optional, Dict
from fastapi import File
from pydantic import BaseModel, Field

from api.models.objectid import PyObjectId

class ContentTypeEnum(IntEnum):

    video = 1
    paper = 2
    blogs = 3
    book = 4

class ContentModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    link : str = Field(...)
    keywords : List[str] = Field(...)
    title : str = Field(...)
    uploader : PyObjectId = Field(...)
    type : ContentTypeEnum = Field(...)
    category : str = Field(...)
    thumbnail: Optional[str] = Field(...)
    comment : Optional[str] = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}   

class CourseModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    content : List[str] = Field(...)
    title: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}  