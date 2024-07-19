from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import tasks
from db import Base, engine

import models

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    tasks.router,
    prefix="/api"
)


@app.get("/")
def home():
    return {"detail": "Task Management API"}
