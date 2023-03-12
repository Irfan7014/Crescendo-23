from fastapi import APIRouter, Body, Depends, File, Form, Query, UploadFile
from fastapi.security import OAuth2PasswordBearer
from api.services.user import get_all_users_service, get_user_service
from api.db.db_config import db, s3
from api.services.content import get_content_service, get_content_by_title_service

recommendation = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_db():
    yield db

def get_s3():
    yield s3

@recommendation.post('/getRecommendationByTitle')
async def getRecommendation(
        title: str = Query(...),
        db = Depends(get_db),
        s3 = Depends(get_s3)
    ):
    content_1 = await get_content_by_title_service(db, title)
    content_2 = await get_content_service(db, 1)
    
    my_list_1 = content_1[0]['keywords']
    my_final_list = {}

    for index in enumerate(content_2):
        my_list_2 = content_2[index[0]]['keywords']
        my_string = content_2[index[0]]['title']
        print(my_string)
        my_list_2.extend(content_2[index[0]]['title'].split())
        my_list_2.extend(content_2[index[0]]['description'].split())
        similarity = jaccard_similarity(set(my_list_1), set(my_list_2))
        
        
        
        print(f"The Jaccard similarity between {content_1[0]['title']} and {content_2[index[0]]['title']} based on their tags is {similarity:.2f}")
        # print(content_2[index]['title'])
        my_final_list[similarity] = content_2[index[0]]['title']
        
    sorted_dict = dict(sorted(my_final_list.items()))
    print(sorted_dict)
    return sorted_dict


@recommendation.post('/getRecommendationByCollaborative')
async def getRecommendation(
        email: str = Query(...),
        db = Depends(get_db),
        s3 = Depends(get_s3)
    ):
    content_1 = await get_user_service(db, email)
    content_2 = await get_all_users_service(db)
    
    my_list_1 = content_1['activity']['content_viewed']
    my_final_list = {}
    print("MY LIST ",my_list_1)
    print()
    print()
    

    for index in range(len(content_2)):
        print(index)
        my_list_2 = content_2[index]['activity']['content_viewed']
        # my_string = content_2[index[0]]['title']
        print("MY list2",my_list_2)
        # my_list_2.extend(content_2[index[0]]['title'].split())
        # my_list_2.extend(content_2[index[0]]['description'].split())
        similarity = jaccard_similarity(set(my_list_1), set(my_list_2))
        s = set(my_list_2)
        final_list = [x for x in my_list_1 if x not in s]
        print(final_list)
        # print(f"The Jaccard similarity between {content_1['name']} and {content_2[index]['name']} based on their tags is {similarity:.2f}")
        # # print(content_2[index]['title'])
        # my_final_list[similarity] = content_2[index]['_id']
        
   
    
    return final_list

def jaccard_similarity(set1, set2):
    intersection = set1.intersection(set2)
    union = set1.union(set2)
    return len(intersection) / len(union)