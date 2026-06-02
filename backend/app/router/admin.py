from fastapi import APIRouter, Path, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine, SessionLocal
from pydantic import BaseModel, Field
from typing import Annotated
from starlette import status
import models
from models import categorys, Products, Users
from .auth import get_current_user


router = APIRouter(
     prefix='/admin',
     tags=['admin']
)


def get_db():
     db = SessionLocal()
     try:
          yield db
     finally:
          db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]

@router.get('/users', status_code=status.HTTP_200_OK)
async def read_all_users(user: user_dependency, db: db_dependency):
     if user is None or user.get('user_role') != 'admin':
          raise HTTPException(status_code=401, detail="Auautherized")
     user_model = db.query(Users).all()
     return user_model


@router.get('/product', status_code=status.HTTP_200_OK)
async def read_all_users(user: user_dependency, db: db_dependency):
     if user is None or user.get('user_role') != 'admin':
          raise HTTPException(status_code=401, detail="Auautherized")
     product_model = db.query(Products).all()
     return product_model


@router.get('/categorys', status_code=status.HTTP_200_OK)
async def read_all_users(user: user_dependency, db: db_dependency):
     if user is None or user.get('user_role') != 'admin':
          raise HTTPException(status_code=401, detail="Auautherized")
     category_model = db.query(categorys).all()
     return category_model


@router.delete('/delete/user/{user_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user: user_dependency, db: db_dependency, user_id: int):
     if user is None or user.get('user_role') != 'admin':
          raise HTTPException(status_code=401, detail='Auautherized')
     user_model = db.query(Users).filter(Users.id == user_id).first()
     if user_model is None:
          raise HTTPException(status_code=404, detail='user not found')
     
     db.query(Users).filter(Users.id == user_id).delete()
     db.commit()


@router.delete('/delete/category/{category_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user: user_dependency, db: db_dependency, category_id: int):
     if user is None or user.get('user_role') != 'admin':
          raise HTTPException(status_code=401, detail='Auautherized')
     category_model = db.query(categorys).filter(categorys.id == category_id).first()
     if category_model is None:
          raise HTTPException(status_code=404, detail='category not found')
     
     db.query(categorys).filter(categorys.id == category_id).delete()
     db.commit()


@router.delete('/delete/product/{category_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user: user_dependency, db: db_dependency, product_id: int):
     if user is None or user.get('user_role') != 'admin':
          raise HTTPException(status_code=401, detail='Auautherized')
     product_model = db.query(Products.id == product_id).filter(Products.id == product_id).first()
     if product_model is None:
          raise HTTPException(status_code=404, detail='Product not found')
     
     db.query(Products).filter(Products.id == product_id).delete()
     db.commit()