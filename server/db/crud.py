from sqlalchemy.orm import Session

from . import models
from schemas import item, user
from utils.hash import hash_password

def get_user(db: Session, user_id: str):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100, user_id=None):
    return db.query(models.User).filter(models.User.id != user_id).offset(skip).limit(limit).all()


def create_user(db: Session, user: user.UserCreate):
    hashed_password = hash_password(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password, username=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()


def create_user_item(db: Session, item: item.ItemCreate, user_id: str):
    db_item = models.Item(**item.dict(), owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_user_info(db: Session, userUpdate: user.UserUpdate, user:user.User):
    user.bio = userUpdate.bio
    user.username = userUpdate.username
    db.commit()
    db.refresh(user)
    return user

def add_friend(db: Session, owner: models.User, friend_id: str):
    db_friend = models.Friend(friend_id=friend_id, owner_id=owner.id, is_add_friend=True)
    db_notify = models.Notify(owner_id=friend_id, content=f"{owner.username} want to add friend with you")
    db.add(db_friend)
    db.add(db_notify)
    db.commit()
    db.refresh(db_friend)
    db.refresh(db_notify)
    return db_friend
