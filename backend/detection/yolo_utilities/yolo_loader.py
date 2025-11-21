import os
from dotenv import load_dotenv
from ultralytics import YOLO

load_dotenv()

MODEL_NAME = os.getenv("MODEL_NAME", "yolov8m.pt")

# utility for loading model
def load_model():
    yolo_model = YOLO(MODEL_NAME)
    
    return yolo_model