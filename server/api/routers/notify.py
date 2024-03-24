from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from db import crud
from db.database import get_db
from schemas import notify
from services import oauth2
from config.logger import logger

router = APIRouter(
    prefix="/notifies",
    tags=["notifies"],
    responses={404: {"description": "Not found"}},
)

@router.get("/me", response_model=list[notify.Notify])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    try:
        notifies = crud.get_notifies(db, owner_id=current_user.id, skip=skip, limit=limit)
        return notifies
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")
