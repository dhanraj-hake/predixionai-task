from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from db import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    status = Column(String, default='todo')
    created_at = Column(DateTime, default=func.now())
