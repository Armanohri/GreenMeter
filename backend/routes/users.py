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

    user_data = {
        "email": user.email,
        "password": hashed
    }
    
    if user.first_name:
        user_data["first_name"] = user.first_name
    if user.last_name:
        user_data["last_name"] = user.last_name

    await users_collection.insert_one(user_data)

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
    
    email = payload["sub"]
    db_user = await users_collection.find_one({"email": email})
    
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user_data = {
        "email": db_user.get("email"),
        "first_name": db_user.get("first_name", ""),
        "last_name": db_user.get("last_name", "")
    }
    
    # Create full name
    full_name = ""
    if user_data["first_name"] and user_data["last_name"]:
        full_name = f"{user_data['first_name']} {user_data['last_name']}"
    elif user_data["first_name"]:
        full_name = user_data["first_name"]
    elif user_data["last_name"]:
        full_name = user_data["last_name"]
    else:
        full_name = user_data["email"].split("@")[0]  # Fallback to email username
    
    return {
        "user": full_name,
        "email": user_data["email"],
        "first_name": user_data["first_name"],
        "last_name": user_data["last_name"]
    }