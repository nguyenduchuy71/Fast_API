from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from db import crud
from db.database import get_db
from schemas import item
from config.logger import logger

router = APIRouter(
    prefix="/items",
    tags=["items"],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=list[item.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        items = crud.get_items(db, skip=skip, limit=limit)
        return items
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")
