from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.users import router as user_router

app = FastAPI(title="GreenMeter API")

# CORS (allow React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # change in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router)

@app.get("/")
def root():
    return {"status": "GreenMeter backend running"}