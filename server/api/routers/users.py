from fastapi import Depends, APIRouter, HTTPException, status
from sqlalchemy.orm import Session
from db import crud
from db.database import get_db
from schemas import item, user, friend
from services import oauth2
from config.logger import logger

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)
        
@router.post("/", response_model=user.User)
def create_user(user: user.UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = crud.get_user_by_email(db, email=user.email)
        if db_user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
        return crud.create_user(db=db, user=user)
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")


@router.get("/", response_model=list[user.User])
def get_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    db_user = crud.get_user(db, user_id=current_user.id)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User not found")
    try:
        users = crud.get_users(db, skip=skip, limit=limit)
        return users
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")


@router.get("/{user_id}", response_model=user.User)
def get_user_by_id(user_id: int, db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    try:
        db_user = crud.get_user(db, user_id=user_id)
        if db_user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return db_user
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.get("/friends/me", response_model=list[user.User])
def get_user_friends(db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    try:
        db_user = crud.get_user(db, user_id=current_user.id)
        if db_user is None:
            raise HTTPException(status_code=404, detail="User not found")
        friends = crud.get_friends_by_user(db, user_id=current_user.id)
        return friends
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.get("/profile/me", response_model=user.User)
def get_user_profile(db: Session = Depends(get_db), current_user = Depends(oauth2.get_current_user)):
    try:
        db_user = crud.get_user(db, user_id=current_user.id)
        if db_user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return db_user
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")
    

@router.post("/{user_id}/items/", response_model=item.Item)
def create_item_for_user(
    user_id: int, item: item.ItemCreate, db: Session = Depends(get_db),
    current_user = Depends(oauth2.get_current_user)
):
    try:
        db_user = crud.get_user(db, user_id=current_user.id)
        if db_user is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
        return crud.create_user_item(db=db, item=item, user_id=user_id)
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.post("/addfriend", response_model=list[user.User])
def addFriend(friend: friend.FriendBase, db: Session = Depends(get_db),
    current_user = Depends(oauth2.get_current_user)):
    try:
        db_user = crud.get_user(db, user_id=current_user.id)
        if db_user is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
        db_friend = crud.add_friend(db, owner=current_user, friend_id=friend.friend_id)
        if db_friend is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Friend not found")
        users = crud.get_users(db)
        return users
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.post("/acceptfriend", response_model=list[user.User])
def acceptFriend(friend: friend.FriendBase, db: Session = Depends(get_db),
    current_user = Depends(oauth2.get_current_user)):
    try:
        db_user = crud.get_user(db, user_id=current_user.id)
        if db_user is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
        db_friend = crud.accept_friend(db, owner=current_user, friend_id=friend.friend_id)
        if db_friend is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Friend not found")
        users = crud.get_users(db)
        return users
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.patch("/update/me", response_model=user.User)
def updateUserInfo(userUpdate: user.UserUpdate, db: Session = Depends(get_db),
    current_user = Depends(oauth2.get_current_user)):
    try:
        userInfo = crud.get_user(db, user_id=current_user.id)
        if userInfo is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
        db_user = crud.update_user_info(db, userUpdate, userInfo) 
        return db_user
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")

@router.get("/share/{friendId}")
def get_share_user_image(friendId: str, db: Session = Depends(get_db),
    current_user = Depends(oauth2.get_current_user)):
    try:
        userInfo = crud.get_user(db, user_id=current_user.id)
        if userInfo is None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User not found")
        db_user = crud.get_share_friend_item(db, current_user.id, friendId) 
        return db_user
    except Exception as error:
        logger.error(error)
        return HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="SERVER ERROR")
