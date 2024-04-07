import firebase_admin
import os
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, status, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from db.database import get_db
from config.logger import logger
from services import oauth2
from firebase.storage import upload_file, remove_file
from firebase_admin import credentials, storage
from pathlib import Path
from db import crud
from schemas import item

load_dotenv()
CONFIG_DIR = Path('firebase') / 'serviceAccountKey.json'
cred = credentials.Certificate(CONFIG_DIR)
firebase_admin.initialize_app(cred)

router = APIRouter(
    prefix="/collections",
    tags=["collections"],
    responses={404: {"description": "Not found"}},
)
bucket = storage.bucket(os.getenv('FIREBASE_STORAGE_BUCKET'))

@router.get("/", response_model=list[item.Item])
def get_collections(db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    try:
        db_user = crud.get_user(db, user_id=current_user.id)
        if db_user is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
        items = crud.get_user_item(db=db, user_id=current_user.id)
        return items
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.post("/")
def post_collections(files: list[UploadFile] = File(...), db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    try:
        db_user = crud.get_user(db, user_id=current_user.id)
        if db_user is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
        for file in files:
            item = {'title': file.filename}
            crud.create_user_item(db=db, item=item, user_id=current_user.id)
            destination_blob_name = f"{current_user.id}/{file.filename}"
            upload_file(bucket, file, destination_blob_name)
        return status.HTTP_200_OK
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.delete("/{ownerId}/{imagePath}")
def delete_collections(ownerId: str, imagePath: str ,db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    try:
        db_user = crud.get_user(db, user_id=current_user.id)
        if db_user is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
        crud.delete_user_item(db=db, ownerId=ownerId, itemPath=imagePath)
        blob_path = f"{ownerId}/{imagePath}"
        remove_file(bucket, blob_path)
        return status.HTTP_204_NO_CONTENT
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")
