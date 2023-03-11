
from api.db.db_config import db
from api.models.user import UserModel

from fastapi.encoders import jsonable_encoder

async def create_user(db, user):
    print('Here')
    user = jsonable_encoder(user)
    print('Hello')
    return await db["users"].insert_one(user)

async def get_user(db, id):
    return await db["users"].find_one({"_id": id})