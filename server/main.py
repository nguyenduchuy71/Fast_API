import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers.users import router as userRouter
from api.routers.auth import router as authRouter
from api.routers.notify import router as notifyRouter
from api.routers.collection import router as collectionRouter
from db.database import engine
from db import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(userRouter)
app.include_router(authRouter)
app.include_router(notifyRouter)
app.include_router(collectionRouter)

@app.get('/')
def root():
    return {'message': "Hello, welcome to FastAPI"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True, log_level="debug")
