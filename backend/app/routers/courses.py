from typing import Optional
from fastapi import APIRouter, Depends, Form, UploadFile, File
from sqlalchemy.orm import Session, joinedload
from ..database import get_db
import os
from ..dependencies import get_current_user, dynamic_role_check
from .. import models, schemas

router = APIRouter(prefix="/api/courses", tags=["Courses"])


@router.get("/")
async def get_public_courses(db: Session = Depends(get_db)):
    return db.query(models.Course).all()


@router.post("/create")
async def create_course(
    course_name: str = Form(...),
    description: str = Form(...),
    price: float = Form(...),
    duration: str = Form(...),
    category: str = Form(...),
    instructor_name: str = Form(...),
    level: str = Form(...),
    thumbnail: UploadFile = File(None),
    syllabus: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(dynamic_role_check("instructor"))
):
    thumb_path = "/static/default_course.jpg"
    if thumbnail:
        os.makedirs("uploads/thumbnails", exist_ok=True)
        file_extension = thumbnail.filename.split(".")[-1]
        unique_filename = f"course_{current_user.id}_{int(os.path.getmtime('static/thumbnails'))}.{file_extension}"
        thumb_path = os.path.join("static/thumbnails", unique_filename)
        with open(thumb_path, "wb") as buffer:
            buffer.write(await thumbnail.read())

        thumb_url = f"/{thumb_path}"
    new_course = models.Course(
        title=course_name,
        description=description,
        price=price,
        duration=duration,
        category=category,
        level=level,
        # thumbnail_id=current_user.id,
        image_url=thumb_path,
        instructor=current_user.full_name,
        owner_id=current_user.id
    )
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course


@router.get("/")
async def get_public_courses(
    db: Session = Depends(get_db),
    search: Optional[str] = None  # Add this parameter
):
    query = db.query(models.Course)
    if search:
        # Filters title or description containing the search string (case-insensitive)
        query = query.filter(
            (models.Course.title.ilike(f"%{search}%")) |
            (models.Course.description.ilike(f"%{search}%"))
        )
    return query.all()


@router.post("/{course_id}/modules", response_model=schemas.Module)
async def add_module(
    course_id: int,
    module_data: schemas.ModuleCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(dynamic_role_check("instructor"))
):
    # Security Check: Ensure the instructor owns this course
    course = db.query(models.Course).filter(
        models.Course.id == course_id, models.Course.owner_id == current_user.id).first()
    if not course:
        return {"error": "Course not found or access denied"}

    new_module = models.Module(
        title=module_data.title,
        course_id=course_id
    )
    db.add(new_module)
    db.commit()
    db.refresh(new_module)
    return new_module


@router.post("/modules/{module_id}/lessons", response_model=schemas.Lesson)
async def add_lesson(
    module_id: int,
    lesson_data: schemas.LessonCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(dynamic_role_check("instructor"))
):
    # Verify module exists and belongs to a course owned by the instructor
    module = db.query(models.Module).join(models.Course).filter(
        models.Module.id == module_id,
        models.Course.owner_id == current_user.id
    ).first()

    if not module:
        return {"error": "Module not found or access denied"}

    new_lesson = models.Lesson(
        title=lesson_data.title,
        duration=lesson_data.duration,
        module_id=module_id
    )
    db.add(new_lesson)
    db.commit()
    db.refresh(new_lesson)
    return new_lesson


@router.get("/{course_id}")
async def get_course_detail(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).options(
        joinedload(models.Course.modules).joinedload(models.Module.lessons)
    ).filter(models.Course.id == course_id).first()

    if not course:
        return {"error": "Course not found"}
    return course


@router.get("/instructor/my-courses")
async def get_instructor_courses(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(dynamic_role_check("instructor"))
):

    courses = db.query(models.Course).filter(
        models.Course.owner_id == current_user.id).all()
    return courses
