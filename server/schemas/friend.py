from pydantic import BaseModel

class FriendBase(BaseModel):
    friend_id: str

class FriendCreate(FriendBase):
    pass

class Friend(FriendBase):
    owner_id: str

    class Config:
        from_attributes = True
