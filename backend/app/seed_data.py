from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app import models


def seed_courses():
    db = SessionLocal()
    # Check if courses already exist
    if db.query(models.Course).first():
        print("Database already has courses!")
        return

    # Add your specific courses here
    course_list = [
        models.Course(
            title="Web Design Fundamentals",
            description="Learn the fundamentals of web design, including HTML, CSS, and responsive design principles.",
            instructor="John Smith",
            level="Beginner",
            duration="4 Weeks"
        ),
        models.Course(
            title="UI/UX Design",
            description="Master the art of creating intuitive user interfaces (UI) and enhancing user experiences (UX).",
            instructor="Emily Johnson",
            level="Intermediate",
            duration="6 Weeks"
        )
    ]

    db.add_all(course_list)
    db.commit()
    print("Courses added successfully!")
    db.close()


if __name__ == "__main__":
    seed_courses()
