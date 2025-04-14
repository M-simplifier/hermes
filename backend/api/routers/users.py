from fastapi import APIRouter, Path
from pydantic import BaseModel

from ..models import User
from .auth import db_dependency, user_dependency

router = APIRouter(prefix="/users", tags=["users"])


class UserResponse(BaseModel):
    id: int
    username: str


@router.get("/current", response_model=UserResponse)
async def current_user(
    db: db_dependency, user: user_dependency
):
    return user


@router.get("/{user_id}", response_model=UserResponse)
async def read_user(
    db: db_dependency, user_id: int = Path(gt=0)
):
    user = db.query(User).filter(User.id == user_id).first()
    return {"id": user.id, "username": user.username}
