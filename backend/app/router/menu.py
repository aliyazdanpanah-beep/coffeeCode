from fastapi import APIRouter, Path, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine, SessionLocal
from pydantic import BaseModel, Field
from typing import Annotated
from starlette import status
import models
from models import categorys, Products
from .auth import get_current_user


router = APIRouter()


def get_db():
     db = SessionLocal()
     try:
          yield db
     finally:
          db.close()

db_dependency = Annotated[Session, Depends(get_db)]
user_dependency = Annotated[dict, Depends(get_current_user)]


class apiRequest(BaseModel):
     # id: int = Field(gt=0)
     name: str = Field(min_length=4, max_length=25)
     category: str = Field(min_length=4, max_length=25)
     price: int = Field(gt=0)
     img: str = Field(max_length=2560)


class categoryRequest(BaseModel):
     img: str = Field(min_length=10)
     title: str = Field(min_length=0, max_length=20)


class categoryRequest(BaseModel):
     img: str = Field(max_length=2560)
     title: str = Field(min_length=1, max_length=256)


@router.get('/product', status_code=status.HTTP_200_OK)
async def get_all_data(db: db_dependency):
     return db.query(Products).all()


@router.post('/create/products/', status_code=status.HTTP_201_CREATED)
async def create_product(db: db_dependency, product_request: apiRequest):
     product_model = Products(**product_request.model_dump())
     
     db.add(product_model)
     db.commit()


@router.put('/update/product/{products_id}')
async def update_products(db: db_dependency, product_request: apiRequest, products_id: int = Path(gt=0)):
     product_model = db.query(Products).filter(Products.id == products_id).first()
     if product_model is None:
          raise HTTPException(status_code=404, detail="product not found")
     
     product_model.name = product_request.name
     product_model.category = product_request.category
     product_model.price = product_request.price
     product_model.img = product_request.img

     db.add(product_model)
     db.commit()


@router.delete('/product/delete/{product_id}')
async def delete_product_by_id(db: db_dependency, product_id: int = Path(gt=0)):
     product_mode = db.query(Products).filter(Products.id == product_id).first()
     if product_mode is None:
          raise HTTPException(status_code=404, detail='product not found')
     db.query(Products).filter(Products.id == product_id).delete()
     db.commit()


# ______category table : Endpoints_______


@router.get('/categorys', status_code=status.HTTP_200_OK)
async def get_app_category(db: db_dependency):
     return db.query(categorys).all()



@router.put('/api/update/categorys/{category_id}', status_code=status.HTTP_200_OK)
async def update_category(db: db_dependency, category_request = categoryRequest, category_id: int = Path(gt=0)):
     category_model = db.query(categorys).filter(categorys.id == category_id).first()
     if category_model is None:
          raise HTTPException(status_code=404, detail="product not found")
     
     category_model.img = category_request.img
     category_model.title = category_request.title

     db.add(category_model)
     db.commit()


@router.post('/create/category/', status_code=status.HTTP_201_CREATED)
async def create_category(db:db_dependency, request_category: categoryRequest):
     category_model = categorys(**request_category.model_dump())

     db.add(category_model)
     db.commit()


@router.delete('/categor/delete/{category_id}')
async def delete_category_by_id(db:db_dependency, category_id: int = Path(gt=0)):
     category_model = db.query(categorys).filter(categorys.id == category_id).first()
     if category_model is None:
          raise HTTPException(status_code=404, detail='category not found')
     
     db.query(categorys).filter(categorys.id == category_id).delete()
     db.commit()