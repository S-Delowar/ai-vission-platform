import os
import cv2
from django.conf import settings
import numpy as np
from detection.models import Detection
from detection.yolo_utilities.yolo_loader import load_model 

# Load yolo model
yolo_model = load_model()

# run detection
def run_yolo_and_annotate(upload_instance):
    """
    run YOLO on the saved image, save annotated image, and create Detection objects.
    Returns list of dict detection results.
    """
    img_path = upload_instance.image.path
    results = yolo_model(img_path)
    r = results[0]
    boxes = r.boxes
    names = r.names

    detections = []
    
    # read image using cv2 for annotation
    img = cv2.imread(img_path)
    h, w = img.shape[:2]
    
    for i, box in enumerate(boxes):
        bbox = box.xyxy[0].tolist()
        # convert to rounded integers
        x1, y1, x2, y2 = [round(v) for v in bbox]

        # ensure values stay within the image dimensions
        x1 = max(0, min(x1, w - 1))
        y1 = max(0, min(y1, h - 1))
        x2 = max(0, min(x2, w - 1))
        y2 = max(0, min(y2, h - 1))
        
        conf = float(box.conf[0]) if hasattr(box.conf, "__len__") else float(box.conf)
        conf = round(conf, 3)
        cls_id = int(box.cls[0]) if hasattr(box.cls, "__len__") else int(box.cls)
        class_name = names[cls_id] if names and cls_id in names else str(cls_id)
        
        # Save detection
        det = Detection.objects.create(
            upload = upload_instance,
            class_name = class_name,
            confidence = conf,
            x_min = x1,
            y_min = y1,
            x_max = x2,
            y_max = y2
        )
        
        detections.append({
            "id": det.id,
            "class_name": class_name,
            "confidence": conf,
            "x_min": x1,
            "y_min": y1,
            "x_max": x2,
            "y_max": y2,
        })
        
        # draw annotation
        cv2.rectangle(img, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
        label = f"{class_name} {conf:.2f}"
        cv2.putText(img, label, (int(x1), int(y1) - 6), cv2.FONT_HERSHEY_SIMPLEX, 0.45, (255,255,255), 1)
        
    # Save annotated image
    annotated_path = os.path.join(settings.MEDIA_ROOT, "annotated", f"anno_{upload_instance.id}.jpg")
    os.makedirs(os.path.dirname(annotated_path), exist_ok=True)
    cv2.imwrite(annotated_path, img)
    
    # Set the model instance field
    rel_path = os.path.relpath(annotated_path, settings.MEDIA_ROOT)
    upload_instance.annotated.name = rel_path
    upload_instance.save(update_fields=['annotated'])
    
    return detections