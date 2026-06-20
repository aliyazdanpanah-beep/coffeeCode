from sqlalchemy import Column, Integer, String, Boolean,ForeignKey
from database import Base

class Users(Base):
     __tablename__ = 'users'

     id = Column(Integer, primary_key=True, index=True)
     username = Column(String, unique=True)
     email = Column(String, unique=True)
     hashed_password = Column(String)
     first_name = Column(String)
     last_name = Column(String)
     role = Column(String)
     is_active = Column(Boolean, default=True)


class categorys(Base):
     __tablename__ = "categorys"

     id = Column(Integer, primary_key=True, index=True)
     img = Column(String)
     title = Column(String)
     owner_id = Column(Integer, ForeignKey("users.id"))


class Products(Base):
     __tablename__ = "products"

     id = Column(Integer, primary_key=True, index=True)
     name = Column(String(256))
     category = Column(String(256))
     price = Column(Integer)
     img = Column(String)
     owner_id = Column(Integer, ForeignKey("users.id"))

