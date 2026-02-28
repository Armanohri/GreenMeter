from fastapi import APIRouter, HTTPException, Depends, Header
from backend.database import users_collection
from backend.models import UserCreate, UserLogin, TokenResponse
from backend.auth import hash_password, verify_password, create_access_token, verify_token

router = APIRouter(prefix="/auth", tags=["Auth"])


# REGISTER
@router.post("/register")
async def register(user: UserCreate):
    existing = await users_collection.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed = hash_password(user.password)

    await users_collection.insert_one({
        "email": user.email,
        "password": hashed
    })

    return {"message": "User registered successfully"}


# LOGIN (returns JWT)
@router.post("/login", response_model=TokenResponse)
async def login(user: UserLogin):
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"sub": user.email})

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# PROTECTED ROUTE EXAMPLE
@router.get("/me")
async def get_current_user(authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    payload = verify_token(token)

    return {
        "message": "Protected route accessed",
        "user": payload["sub"]
    }