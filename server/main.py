from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routers.items import router as itemRouter
from api.routers.users import router as userRouter
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
