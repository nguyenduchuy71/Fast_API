from pydantic import BaseModel
from . import item

class UserBase(BaseModel):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    items: list[item.Item] = []

    class Config:
        from_attributes = True