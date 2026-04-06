from sqlalchemy import Column, Integer, String, Text, ForeignKey, Enum as SqlEnum, Float
from sqlalchemy.orm import relationship
from .database import Base
from enum import Enum


class UserRole(str, Enum):
    STUDENT = "student"
    INSTRUCTOR = "instructor"
    ADMIN = "admin"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    bio = Column(Text, nullable=True)
    profile_image = Column(String, nullable=True)
    role = Column(String, default="student")

    instructor_profile = relationship(
        "Instructor", back_populates="user", uselist=False)
    courses_owned = relationship("Course", back_populates="owner")


class Instructor(Base):
    __tablename__ = "instructors"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    # Instructor-specific data
    specialization = Column(String)
    rating = Column(Float, default=0.0)
    total_students = Column(Integer, default=0)

    user = relationship("User", back_populates="instructor_profile")


class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    instructor = Column(String)
    price = Column(Float)
    category = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    image_url = Column(String)
    level = Column(String)  # e.g., Beginner, Intermediate
    duration = Column(String)
    contents = relationship("CourseContent", back_populates="course")

    owner = relationship("User", back_populates="courses_owned")

    contents = relationship("CourseContent", back_populates="course")


class CourseContent(Base):
    __tablename__ = "course_contents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    body_text = Column(Text)
    video_url = Column(String, nullable=True)

    course_id = Column(Integer, ForeignKey("courses.id"))

    course = relationship("Course", back_populates="contents")
