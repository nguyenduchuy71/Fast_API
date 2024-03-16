import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routers.items import router as itemRouter
from api.routers.users import router as userRouter
from api.routers.auth import router as authRouter
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

app.include_router(itemRouter)
app.include_router(userRouter)
app.include_router(authRouter)

@app.get('/')
def root():
    return {'message': "Hello, welcome to FastAPI"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, log_level="debug")
