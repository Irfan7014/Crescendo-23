from io import StringIO
from typing import Optional

from django import db
from api.models.forum import ForumModel, ForumCommentModel
from sqlalchemy import false, true
from api.db.db_manager import create_user, get_user
from fastapi.encoders import jsonable_encoder
from api.models.user import UserModel
import requests
from api.services.twiliotp import client
from bson import ObjectId

async def create_forum_service(db, forum):
    result = await db["forums"].insert_one(forum)
    created_forum = await db["forums"].find_one({"_id": result.inserted_id})
    return created_forum

async def create_comment_service(db, forum, forum_id):
    result = await db["forums"].update_one({"_id": forum_id}, {"$set": forum})
    updated_forum = await db["forums"].find_one({"_id": forum_id})
    return updated_forum

async def get_all_forum_service(db):
    result = await db["forums"].find().to_list(1000)
    return result

async def get_forum_service(db, forum_id):
    result = await db["forums"].find({"_id": forum_id}).to_list(1000)
    return result

async def get_comment_service_by_user(db, user_id):
    result = await db["forums"].find({"comment.user_id": user_id}).to_list(1000)
    return result

async def get_forum_service_by_user(db, user_id):
    result = await db["forums"].find_one({"user_id": user_id})
    return result

def update_forum(forum_id: ObjectId, forum: ForumModel) -> bool:
    result = db["forums"].update_one({"_id": forum_id}, {"$set": forum.dict(by_alias=True)})
    return result.modified_count > 0


def delete_forum(forum_id: ObjectId) -> bool:
    result = db["forums"].delete_one({"_id": forum_id})
    return result.deleted_count > 0

# CRUD functions for ForumCommentModel
def create_forum_comment(forum_id: ObjectId, comment: ForumCommentModel) -> bool:
    result = db["forums"].update_one({"_id": forum_id}, {"$push": {"comment": comment.dict()}})
    return result.modified_count > 0

def get_forum_comment(forum_id: ObjectId, comment_id: ObjectId) -> Optional[ForumCommentModel]:
    result = db["forums"].find_one({"_id": forum_id, "comment._id": comment_id}, {"comment.$": 1})
    return ForumCommentModel(**result["comment"][0]) if result else None

def update_forum_comment(forum_id: ObjectId, comment_id: ObjectId, comment: ForumCommentModel) -> bool:
    result = db["forums"].update_one({"_id": forum_id, "comment._id": comment_id},
                                     {"$set": {"comment.$": comment.dict()}})
    return result.modified_count > 0

def delete_forum_comment(forum_id: ObjectId, comment_id: ObjectId) -> bool:
    result = db["forums"].update_one({"_id": forum_id}, {"$pull": {"comment": {"_id": comment_id}}})
    return result.modified_count > 0