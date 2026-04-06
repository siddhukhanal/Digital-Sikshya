import os
from fastapi import UploadFile, File, Form
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles


from pydantic import BaseModel

from sqlalchemy.orm import Session
from fastapi.staticfiles import StaticFiles
from .models import User
from .routers import auth, courses, users
from .dependencies import (
    get_current_user,
    oauth2_scheme,
    verify_token,
    SECRET_KEY,
    ALGORITHM,
    dynamic_role_check
)

from . import models, schemas
from . database import engine, get_db
from .routers.auth import (
    create_access_token,
    verify_password,
    hash_password,
    oauth2_scheme,
    verify_token
)


UPLOAD_DIR = "static/profile_pics"
os.makedirs(UPLOAD_DIR, exist_ok=True)

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(auth)
app.include_router(courses)
app.include_router(users)
app.mount("/static", StaticFiles(directory="static"), name="static")


origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Course(BaseModel):
    id: int
    title: str
    description: str
    instructor: str
    price: float
    category: str


class CourseCreate(BaseModel):
    title: str
    description: str
    price: float
    category: str


def dynamic_role_check(required_role: str):
    def role_checker(current_user: models.User = Depends(get_current_user)):
        if current_user.role != required_role and current_user.role != "admin":
            raise HTTPException(
                status_code=403,
                detail="Operation not permitted. You must be an instructor."
            )
        return current_user
    return role_checker


async def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"}
        )
    email: str = payload.get("sub")
    if email is None:
        raise HTTPException(status_code=401, detail="Token missing subject")
    user = db.query(models.User).filter(models.User.email == email).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


class UserCreate(BaseModel):
    email: str
    password: str
    full_name: str


@app.get("/")
def read_root():
    return {"message": "Welcome to the Edustream API"}


@app.put("/api/user/update-profile")
async def update_profile(
    full_name: str = Form(...),
    bio: str = Form(...),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    # Update text fields
    current_user.full_name = full_name
    current_user.bio = bio

    # Handle image upload if provided
    if image:
        file_extension = image.filename.split(".")[-1]
        file_name = f"user_{current_user.id}.{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, file_name)

        with open(file_path, "wb") as buffer:
            buffer.write(await image.read())

        current_user.profile_image = f"/{file_path}"

    db.commit()
    return {
        "name": current_user.full_name,
        "bio": current_user.bio,
        "image": current_user.profile_image
    }


@app.get("/courses/{course_id}")
def get_course_detail(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(
        models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    return course


@app.get("/api/instructor/courses")
async def get_instructor_courses(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return db.query(models.Course).filter(
        models.Course.owner_id == current_user.id
    ).all()
