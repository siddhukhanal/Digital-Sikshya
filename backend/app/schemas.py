from pydantic import BaseModel, EmailStr
from typing import Optional, List

# This is what we use in the signup route


class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    bio: Optional[str] = None
    profile_image: Optional[str] = None


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: str = "student"


# This is what we return to the frontend (excludes the password for security)


class UserOut(BaseModel):
    id: int

    class Config:
        from_attributes = True


class CourseCreate(BaseModel):
    title: str
    description: str
    price: float
    category: str

    image_url: str = "default_image.jpg"
    level: str = "Beginner"
    duration: str = "10 hours"


class LessonCreate(BaseModel):
    title: str
    duration: str


class Lesson(LessonCreate):
    id: int
    module_id: int

    class Config:
        from_attributes = True


class ModuleCreate(BaseModel):
    title: str


class Module(ModuleCreate):
    id: int
    course_id: int
    lessons: List[Lesson] = []  # This allows nested lessons

    class Config:
        from_attributes = True
