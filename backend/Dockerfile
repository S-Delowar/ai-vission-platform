# ------------------------
# Django Backend Dockerfile
# ------------------------
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# System deps for Ultralytics (OpenCV, libgl, etc.)
RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Install Python deps
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# -------------------------
# Download YOLO model once during build
# -------------------------
RUN python3 -c "from ultralytics import YOLO; YOLO('yolov8m.pt')"

# Copy Django project
COPY . .

# Expose port
EXPOSE 8000

# Gunicorn command (ONLY here!)
CMD ["gunicorn", "core.wsgi:application", "--bind", "0.0.0.0:8000"]
