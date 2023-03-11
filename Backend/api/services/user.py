
from io import StringIO
from sqlalchemy import false, true
from api.db.db_manager import create_user, get_user
from fastapi.encoders import jsonable_encoder
from api.models.user import UserModel
import requests
from api.services.twiliotp import client

async def create_user_service(db, user):
    new_user = await db["users"].insert_one(user)
    created_user = await db["users"].find_one({"_id": new_user.inserted_id})
    return created_user

async def update_user_service(db, email, user):
    update_result = await db["users"].update_one({"email": email}, {"$set": user})
    if update_result.modified_count == 1:
        update_user = await db["users"].find_one({"email": email})
        if update_user is not None:
            return update_user
    return None

async def get_user_service(db, email):
    user = await db["users"].find_one({"email": email})
    return user

async def get_user_by_id_service(db, user_id):
    user = await db["users"].find_one({"_id": user_id})
    return user

async def get_all_users_service(db):
    users = await db["users"].find().to_list(1000)
    return users

async def create_aadhar_service(db, aadhar):
    new_aadhar = await db["aadhars"].insert_one(aadhar)
    created_aadhar = await db["aadhars"].find_one({"_id": new_aadhar.inserted_id})
    return created_aadhar

async def validate_aadhar_service(db, aadhar):
    aadhar =  await db["aadhars"].find_one({"aadhar": aadhar}, {'_id': 0})
    print(aadhar)
    return aadhar

async def store_document(s3, requiredDocuments):
    s3.upload_fileobj(requiredDocuments.file, 'sihdigitalpirates', requiredDocuments.filename)
    url = s3.generate_presigned_url('get_object',
                                                Params={'Bucket': 'sihdigitalpirates',
                                                        'Key': requiredDocuments.filename},
                                                ExpiresIn=604799)
    return url

async def send_otp_service(phone):
    print(phone)
    verification = client.verify \
                     .v2 \
                     .services('VA051afe74284ffe50a5782266859bbf77') \
                     .verifications \
                     .create(to=phone, channel='sms')
    return verification

async def verify_otp_service(phone, code):
    verification_check = client.verify \
                           .v2 \
                           .services('VA051afe74284ffe50a5782266859bbf77') \
                           .verification_checks \
                           .create(to=phone, code=code)

    return verification_check

async def verify_user_service(db, phone):
    user = {}
    user['verified'] = True
    update_result = await db["users"].update_one({"phone": int(phone[3:])}, {"$set": user})
    if update_result.modified_count == 1:
        update_user = await db["users"].find_one({"phone": int(phone[3:])})
        if update_user is not None:
            return update_user
    return None