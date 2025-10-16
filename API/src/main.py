from ultralytics import YOLO
import cv2
from fastapi import FastAPI, File, UploadFile
import numpy as np
import uvicorn
from src.board_detection import FenConverter

app = FastAPI()

MODEL_PATH = "/app/model/model.pt" # docker path
IMAGE_SIZE = 416
model = YOLO(MODEL_PATH)


def pre_processing(img_web, IMAGE_SIZE):
    img_np_array = np.frombuffer(img_web, np.uint8)
    img = cv2.imdecode(img_np_array, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (IMAGE_SIZE, IMAGE_SIZE))
    return img

    
def predict(img, IMAGE_SIZE):
    results = model.predict(img, imgsz=IMAGE_SIZE)
    return results


@app.post("/convert/")
async def main(file: UploadFile = File(...)):
    web_img = await file.read()
    converter = FenConverter()

    img = pre_processing(web_img, IMAGE_SIZE)
    results = predict(img, IMAGE_SIZE)
    boxes = results[0].boxes
    chessboard_matrix = converter.boxes_to_matrix(boxes)
    fen = converter.to_fen(chessboard_matrix)
    return {"fen": fen}

if __name__ == "__main__":
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True) 
