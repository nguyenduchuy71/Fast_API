from sqlalchemy.orm import Session
from sqlalchemy import or_

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


def get_user_item(db: Session, user_id: str):
    return db.query(models.Item).order_by(models.Item.createdAt.desc()).filter(models.Item.owner_id == user_id).all()

def create_user_item(db: Session, item: item.ItemCreate, user_id: str):
    db_item = db.query(models.Item).filter(models.Item.owner_id == user_id).filter(models.Item.title == item['title']).first()
    if not db_item:
        db_item = models.Item(**item, owner_id=user_id)
        db.add(db_item)
        db.commit()
        db.refresh(db_item)
    return db_item

def delete_user_item(db: Session, ownerId:str, itemPath: str):
    db_item = db.query(models.Item).filter(models.Item.owner_id==ownerId).filter(models.Item.title==itemPath).first()
    if db_item:
        db.delete(db_item)
        db.commit()
    return db_item

def update_user_info(db: Session, userUpdate: user.UserUpdate, user:user.User):
    user.bio = userUpdate.bio
    user.username = userUpdate.username
    user.avatar = userUpdate.avatar
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

def accept_friend(db: Session, owner: models.User, friend_id: str):
    friend = db.query(models.Friend).filter(models.Friend.owner_id==friend_id).filter(models.Friend.friend_id==owner.id).first()
    if friend:
        friend.is_accept_friend = True
        notify = models.Notify(owner_id=friend_id, content=f"{friend_id} accpeted your friend invite")
        db.add(notify)
        db.commit()
        db.refresh(friend)
        db.refresh(notify)
    return friend

def get_notifies(db: Session, owner_id: str = None, skip: int = 0, limit: int = 100):
    return db.query(models.Notify).order_by(models.Notify.createdAt.desc()).filter(models.Notify.owner_id == owner_id).offset(skip).limit(limit).all()

def get_friends_by_user(db: Session, user_id: str):
    friends = db.query(models.Friend).filter(or_(models.Friend.owner_id == user_id, models.Friend.friend_id == user_id)).all()
    ids = []
    for friend in friends:
        if user_id != friend.owner_id:
            ids.append(friend.owner_id)
        elif user_id != friend.friend_id:
            ids.append(friend.friend_id)
    return db.query(models.User).filter(models.User.id.in_(set(ids))).all()

def share_friend_item(db: Session, user_id: str, friend_id: str, srcImage: str):
    db_share = models.UserShareItem(owner_id=user_id, friend_id=friend_id, imageShare=srcImage)
    db.add(db_share)
    db.commit()
    db.refresh(db_share)
    return db_share

def get_share_friend_item(db: Session, user_id: str, friend_id: str):
    return db.query(models.UserShareItem).filter(models.UserShareItem.owner_id==user_id).filter(models.UserShareItem.friend_id==friend_id).all()
