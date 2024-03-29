from pydantic import BaseModel


class ItemBase(BaseModel):
    title: str


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: str
    owner_id: str

    class Config:
        from_attributes = True
