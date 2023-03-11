import motor.motor_asyncio
import boto3
from botocore.client import Config

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb+srv://jalpraman:xoIY8swzqCVWEbi5@cluster1.wpxpi5j.mongodb.net/test') #Change to your local mongo connection string url

db = client.jalpraman

s3 = boto3.client(
    's3',
    aws_access_key_id='AKIASG53TUK3WBLPI56H', #AWS Access Key ID Here
    aws_secret_access_key='d1TjRiv7RwfskUCfjZ33euHzO1Wz7zskeSPMzDFH', #AWS Secret Access Key
    config= Config(signature_version='s3v4')
)