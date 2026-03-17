from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb+srv://GreenMeter:qwerty24@greenmeter.8itgt43.mongodb.net/?appName=GreenMeter"

client = AsyncIOMotorClient(MONGO_URL)
db = client.greenmeter_db

users_collection = db.users
carbon_collection = db.carbon_logs
print(client.list_database_names())