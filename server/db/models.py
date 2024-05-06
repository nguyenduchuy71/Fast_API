import datetime
from sqlalchemy import Boolean, Column, ForeignKey, String, DateTime
from sqlalchemy.orm import relationship

from .database import Base
from utils import uuid


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.generate_uuid()))
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    username = Column(String, index=True, default="")
    bio = Column(String, default="")
    avatar = Column(String, default="https://github.com/shadcn.png")
    is_active = Column(Boolean, default=True)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)

    items = relationship("Item", back_populates="owner")
    friends = relationship("Friend", back_populates="owner")
    notifies = relationship("Notify", back_populates="owner")
    usershareitems = relationship("UserShareItem", back_populates="owner")


class Item(Base):
    __tablename__ = "items"

    id = Column(String, primary_key=True, default=lambda: str(uuid.generate_uuid()))
    title = Column(String, index=True)
    owner_id = Column(String, ForeignKey("users.id"), index=True)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)

    owner = relationship("User", back_populates="items")

class Friend(Base):
    __tablename__ = "friends"

    id = Column(String, primary_key=True, default=lambda: str(uuid.generate_uuid()))
    owner_id = Column(String, ForeignKey("users.id"), index=True)
    friend_id = Column(String, index=True)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)
    is_add_friend = Column(Boolean, default=False)
    is_accept_friend = Column(Boolean, default=False)
    
    owner = relationship("User", back_populates="friends")


class Notify(Base):
    __tablename__ = "notifies"

    id = Column(String, primary_key=True, default=lambda: str(uuid.generate_uuid()))
    owner_id = Column(String, ForeignKey("users.id"), index=True)
    content = Column(String, index=True)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)
    is_readed = Column(Boolean, default=False)
    
    owner = relationship("User", back_populates="notifies")

class UserShareItem(Base):
    __tablename__ = "usershareitems"

    id = Column(String, primary_key=True, default=lambda: str(uuid.generate_uuid()))
    owner_id = Column(String, ForeignKey("users.id"), index=True)
    friend_id = Column(String, index=True)
    item_id = Column(String, index=True)
    createdAt = Column(DateTime, default=datetime.datetime.utcnow)
    
    owner = relationship("User", back_populates="usershareitems")
