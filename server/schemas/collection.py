from pydantic import BaseModel

class CollectionBase(BaseModel):
    pass

class CollectionShare(CollectionBase):
    srcImage: str
