from typing import List

from fastapi import APIRouter, Path, Response
from pydantic import BaseModel, Field
from sqlalchemy import desc
from starlette import status

from ..models import Chat, Room
from .auth import db_dependency, user_dependency

router = APIRouter(tags=["bbs"])


class RoomRequest(BaseModel):
    title: str = Field(min_length=1, max_length=2**7)


class ChatRequest(BaseModel):
    text: str = Field(min_length=1, max_length=2**14)


class RoomResponse(BaseModel):
    id: int
    title: str


class ChatResponse(BaseModel):
    id: int
    text: str
    room_id: int
    owner_id: int


class ChatsResponse(BaseModel):
    title: str
    chats: List[ChatResponse]


@router.get("/{room_id}", status_code=status.HTTP_200_OK, response_model=ChatsResponse)
async def read_chats(
    db: db_dependency, user: user_dependency, room_id: int = Path(gt=0)
):
    title = db.query(Room).filter(Room.id == room_id).first().title
    chats = db.query(Chat).filter(Chat.room_id == room_id).all()
    return {"title": title, "chats": chats}


@router.get("/", status_code=status.HTTP_200_OK, response_model=List[RoomResponse])
async def read_rooms(
    db: db_dependency,
):
    rooms = db.query(Room).order_by(desc(Room.id)).all()
    return rooms


@router.post("/{room_id}", status_code=status.HTTP_201_CREATED)
async def post_chat(
    db: db_dependency,
    user: user_dependency,
    chat_request: ChatRequest,
    room_id: int = Path(ge=0),
):
    chat_model = Chat(
        **chat_request.model_dump(), room_id=room_id, owner_id=user.get("id")
    )
    db.add(chat_model)
    db.commit()


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_room(
    response: Response,
    db: db_dependency,
    user: user_dependency,
    room_request: RoomRequest,
):
    room_model = Room(
        **room_request.model_dump(),
    )
    db.add(room_model)
    db.commit()
    db.refresh(room_model)
    response.headers["Location"] = f"{room_model.id}"
