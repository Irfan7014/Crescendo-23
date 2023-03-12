async def get_all_quiz_service(db):
    quiz = await db["quiz"].find().to_list(1000)
    return quiz

async def get_quiz_service(db, title):
    quiz = await db["quiz"].find({"title": title}).to_list(1000)
    return quiz
