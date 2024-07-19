from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from db import get_db
import models
from schemas import Task, UpdateTask


router = APIRouter(
    prefix="/tasks",
    tags=["tasks"],
    responses={404: {"detail": "Not found"}},
)


@router.get("/")
async def tasks_list(
    db : Session = Depends(get_db)
):
    return db.query(models.Task).all()


@router.get("/{task_id}")
async def get_task_by_id(
    task_id : int,
    db : Session = Depends(get_db)
):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


@router.post("/")
def create_task(
    task : Task,
    db : Session = Depends(get_db)
):
    new_task = models.Task(**task.dict())
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


@router.put("/{task_id}")
def update_task(
    task_id : int,
    task : UpdateTask,
    db : Session = Depends(get_db),
):
    task_exists = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not task_exists:
        raise HTTPException(status_code=404, detail="Task not found")
    task_exists.status = task.status
    db.commit()
    db.refresh(task_exists)
    return task_exists


@router.delete("/{task_id}")
def delete_task(
    task_id : int,
    db : Session = Depends(get_db),
):
    task_exists = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not task_exists:
        raise HTTPException(status_code=404, detail="Task not found")
    task_exists
    db.delete(task_exists)
    db.commit()
    
    return True