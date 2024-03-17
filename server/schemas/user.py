from pydantic import BaseModel
from . import item, friend

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    username: str
    bio: str

class User(UserBase):
    id: str
    is_active: bool
    username: str
    bio: str
    items: list[item.Item] = []
    friends: list[friend.Friend] = []

    class Config:
        from_attributes = True


class UserLogin(UserBase):
    password: str
