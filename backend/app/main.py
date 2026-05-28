from fastapi import FastAPI
from database import engine
from router import menu, auth
from fastapi.middleware.cors import CORSMiddleware 
import models


app = FastAPI()

models.Base.metadata.create_all(bind=engine)

app.include_router(menu.router)
app.include_router(auth.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)
