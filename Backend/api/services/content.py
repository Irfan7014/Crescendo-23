from datetime import datetime, timedelta
from PIL import Image, ImageDraw, ImageFont
import random
import os
import qrcode
import requests
from requests.auth import HTTPBasicAuth
import boto3

async def store_documents(s3, requiredDocuments):
    urls = []
    for document in requiredDocuments:
        s3.upload_fileobj(document.file, 'crescendo-digital-pirates', document.filename)
        url = s3.generate_presigned_url('get_object',
                                                    Params={'Bucket': 'crescendo-digital-pirates',
                                                            'Key': document.filename},
                                                    ExpiresIn=604799)
        urls.append(url)
    return urls

async def store_document(s3, requiredDocuments):
    s3.upload_fileobj(requiredDocuments.file, 'crescendo-digital-pirates', requiredDocuments.filename)
    url = s3.generate_presigned_url('get_object',
                                                Params={'Bucket': 'crescendo-digital-pirates',
                                                        'Key': requiredDocuments.filename},
                                                ExpiresIn=604799)
    return url

async def create_content_service(db, content):
    new_content = await db["content"].insert_one(content)
    created_content = await db["content"].find_one({"_id": new_content.inserted_id})
    return created_content

async def update_content_service(db, id, application):
    update_result = await db["content"].update_one({"_id": id}, {"$set": application})
    if update_result.modified_count == 1:
        update_application = await db["content"].find_one({"_id": id})
        if update_application is not None:
                return update_application
    return None

async def get_all_content_service(db):
    content = await db["content"].find().to_list(1000)
    return content

async def get_content_service(db, type):
    content = await db["content"].find({"type": type}).to_list(1000)
    return content

async def get_content_by_title_service(db, title):
    content = await db["content"].find( { "$text": { "$search": title } } ).to_list(1000)
    return content

async def create_course_service(db, course):
    content = await db["courses"].insert_one(course)
    created_content = await db["courses"].find_one({"_id": content.inserted_id})
    return created_content

async def get_courses_service(db):
    courses = await db["courses"].find( ).to_list(1000)
    return courses

async def get_course_by_id_service(db, course_id):
    courses = await db["courses"].find_one({"_id": course_id})
    return courses

async def get_course_by_category_service(db, category):
    courses = await db["courses"].find_one({"category": category})
    return courses

async def get_content_by_category_service(db, category):
    courses = await db["content"].find_one({"category": category})
    return courses

async def get_content_type_category_service(db, type, category):
    courses = await db["content"].find({
            "$and": [
                {"category": category },
                {"type": type}
            ]
        }).to_list(1000)
    return courses

def jaccard_similarity(set1, set2):
    intersection = set1.intersection(set2)
    union = set1.union(set2)
    return len(intersection) / len(union)

async def get_application_by_id_service(db, id):
    application = await db["content"].find_one({"_id": id})
    return application

async def get_application_by_user_service(db, aadhar):
    application = await db["content"].find({"aadhar": aadhar}).to_list(1000)
    return application

async def get_application_by_port_service(db, adminPort):
    application = await db["applications"].find({"adminPort": adminPort}).to_list(1000)
    return application

async def fetch_documents_service(db, aadhar):
    application = await db["applications"].find({"aadhar": aadhar, "status": "approved"}).to_list(1000)
    return application