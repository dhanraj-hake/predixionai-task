from pydantic import BaseModel
from enum import Enum

class StatusEnum(str, Enum):
    todo = "todo"
    in_progress = "in_progress"
    done = "done"


class Task(BaseModel):
    id : int | None = None
    title : str
    description : str
    status : StatusEnum

    class Config:
        orm_mode = True

class UpdateTask(BaseModel):
    status : StatusEnum