from ultralytics import YOLO
import cv2
from fastapi import FastAPI, File, UploadFile
import numpy as np
import uvicorn

app = FastAPI()


# just for tests
# dummy_img_path = r"C:\dev\Chess-Print-API\dataset\test_images\Captura de tela 2025-08-20 151317.png"
dummy_model_path = r"C:\dev\Chess-Print-API\API\model\model.pt"

def pre_processing(img_web):
    img_np_array = np.frombuffer(img_web, np.uint8)
    img = cv2.imdecode(img_np_array, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (416, 416))
    return img

def predict(img, model_path):
    model = YOLO(model_path)
    results = model.predict(img, imgsz=416)
    return results

def to_matrix(boxes):
    matrix = [[-1 for _ in range(8)] for _ in range(8)] 

    # I need to verify if the boxes exist first
    if boxes is not None:
        for box in boxes:
            if box.conf > 0.6:
                # I willn't use height nor width, because all I need is the center point
                x_ctr, y_ctr, _, _ = box.xywhn[0].tolist()

                # This trick enable me to avoid a O(N^2) algorithm to convert each center in a normalized index.
                x_id = int(x_ctr // (0.125))
                y_id = int(y_ctr // (0.125))

                # Take the class of the piece.
                piece_class = int(box.cls) 

                matrix[y_id][x_id] = piece_class

    else:
        print("Boxes Object is None")

    
    return matrix

def to_fen(matrix):
    id_to_piece = {
         0: 'P', 1: 'N', 2: 'B', 3: 'R', 4: 'Q', 5: 'K', 6: 'p', 7: 'n', 8: 'b', 9: 'r', 10: 'q', 11: 'k'
    }

    count = 0
    fen = ""

    for i in range(0, 8):
        
        for j in range(0, 8):
            if matrix[i][j] != -1:
                    if count != 0:
                        fen += str(count)
                        count = 0
                    fen += id_to_piece[matrix[i][j]]
            else:
                 count += 1

        if count != 0:
            fen += str(count)
            count = 0

        if i < 7:
            fen += "/"

    fen += " w KQkq - 0 1"

    return fen


@app.post("/convert/")
async def main(file: UploadFile = File(...)):
    # Lê a imagem
    web_img = await file.read()

    img = pre_processing(web_img)
    results = predict(img, dummy_model_path)
    boxes = results[0].boxes
    matrix = to_matrix(boxes)
    fen = to_fen(matrix)
    return {"fen": fen}

if __name__ == "__main__":
    main()
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
