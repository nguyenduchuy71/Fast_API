from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from db.database import get_db
from schemas import token
from db.models import User
from utils.hash import verify
from services import oauth2

router = APIRouter(tags=['Authentication'])


@router.post('/login', response_model=token.Token)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # {"username":"sdjasj","password":"283218"}
    print(f'>>>> user_credentials: {user_credentials.password}, {user_credentials.username}')
    userInfo = db.query(User).filter(
        User.email == user_credentials.username).first()
    if not userInfo:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")
    if not verify(user_credentials.password, userInfo.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")
    access_token = oauth2.create_access_token(data={"user_id": userInfo.id})
    return {"token": access_token, "token_type": "bearer"}
