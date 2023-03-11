from datetime import datetime
from typing import List, Dict, Optional
from api.models.objectid import PyObjectId
from bson import ObjectId
from pydantic import BaseModel, Field
from enum import IntEnum

class UserTypeEnum(IntEnum):

    student = 1
    expert = 2
    admin = 3

class UserActivityModel(BaseModel):
    content_viewed: List[str] = Field(...)
    courses_enrolled: Dict[str, bool] = Field(...)
    last_active : datetime = Field(...)

class UserModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    dob: datetime = Field(...)
    gender:str = Field(...)
    phone: int = Field(...)
    password: str = Field(...)
    email: str = Field(...)
    role: str = Field(...)
    activity: Optional[UserActivityModel] = Field(...)
    verified: bool = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class UserRegisterModel(BaseModel):
    name: str = Field(...)
    dob: str = Field(...)
    gender:str = Field(...)
    phone: int = Field(...)
    password: str = Field(...)
    email: str = Field(...)

class UserLoginModel(BaseModel):
    username: int = Field(...)
    password: str = Field(...)

class CurrentUser(BaseModel):
    username: str = Field(...)
    name: str = Field(...)
    access_token: str = None
    claims: str = Field(...)

class UpdateUserActivity(BaseModel):
    activity: UserActivityModel = Field(...)