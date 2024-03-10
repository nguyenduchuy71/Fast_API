from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from db.database import get_db
from schemas import token, user
from db.models import User
from utils.hash import verify
from services import oauth2

router = APIRouter(tags=['Authentication'])


@router.post('/login', response_model=token.Token)
def login(user_credentials: user.UserLogin, db: Session = Depends(get_db)):
    try:
        userInfo = db.query(User).filter(
            User.email == user_credentials.email).first()
        if not userInfo:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")
        if not verify(user_credentials.password, userInfo.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")
        access_token = oauth2.create_access_token(data={"user_id": userInfo.id})
        return {"token": access_token, "token_type": "Bearer"}
    except Exception as e:
        raise e
