from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine
from .models import Base
from .routers import auth, bbs, users
from .settings import get_settings

app = FastAPI()

Base.metadata.create_all(bind=engine)

origins = [
    get_settings().allow_origin,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["location"],
)


app.include_router(auth.router)
app.include_router(bbs.router)
app.include_router(users.router)
