from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb://localhost:27017"

client = AsyncIOMotorClient(MONGO_URL)
db = client.greenmeter_db

users_collection = db.users
carbon_collection = db.carbon_logs
print(client.list_database_names())