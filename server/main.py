import uvicorn
import json
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from api.routers.items import router as itemRouter
from api.routers.users import router as userRouter
from api.routers.auth import router as authRouter
from db.database import engine
from db import models
from services.websocket import ConnectionManager

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
manager = ConnectionManager()

app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(itemRouter)
app.include_router(userRouter)
app.include_router(authRouter)

@app.get('/')
def root():
    return {'message': "Hello, welcome to FastAPI"}

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await manager.connect(client_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            print(f'>>> data:{json.loads(data)}')
            await manager.send_personal_message(f"You wrote: {data}", websocket)
            # await manager.broadcast(f"Client #{client_id} says: {data}", room_id=client_id, websocket=websocket)
    except WebSocketDisconnect:
        await manager.disconnect(client_id, websocket)

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True, log_level="debug")
