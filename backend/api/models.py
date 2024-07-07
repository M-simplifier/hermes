from sqlalchemy import Column, ForeignKey, Integer, String

from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    hashed_password = Column(String)


class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True)
    title = Column(String)


class Chat(Base):
    __tablename__ = "chats"

    id = Column(Integer, primary_key=True)
    text = Column(String)
    room_id = Column(Integer, ForeignKey("rooms.id"))
    owner_id = Column(Integer, ForeignKey("users.id"))
