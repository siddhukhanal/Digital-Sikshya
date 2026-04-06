
from fastapi.security import OAuth2PasswordRequestForm
from ..database import get_db
from fastapi import Depends, HTTPException, status, APIRouter
from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from .. import models, schemas
from ..dependencies import (
    create_access_token,
    verify_password,
    hash_password,
    SECRET_KEY,
    ALGORITHM
)
from ..dependencies import SECRET_KEY, ALGORITHM, oauth2_scheme
from ..database import get_db

router = APIRouter(tags=["Authentication"])


def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None


@router.post("/api/token")
async def login(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    user = db.query(models.User).filter(
        models.User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    access_token = create_access_token(data={"sub": user.email})

    return {""
            "access_token": access_token,
            "token_type": "bearer",
            "role": user.role,

            "name": user.full_name,
            "email": user.email}


@router.post("/api/signup")
async def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(
        models.User.email == user.email).first()

    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = models.User(
        email=user.email,
        full_name=user.full_name,
        hashed_password=hash_password(user.password),
        role=user.role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully. Please log in."}
