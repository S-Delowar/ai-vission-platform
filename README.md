# AI Image Analysis & Q&A Platform

A full‑stack AI web application where users can authenticate, upload an image, run **YOLOv8 object detection**, view annotated results, and ask analytical questions powered by **Gemini 2.5**. The entire system runs via **Docker Compose** and demonstrates production‑grade full‑stack AI engineering.

---

# 📌 Overview
This project combines **computer vision**, **LLM reasoning**, and **full‑stack development** into a single, containerized application. After logging in, users can:

1. Upload an image
2. Trigger YOLO detection (running inside Django backend container)
3. View:
   - Annotated image with bounding boxes
   - Sortable table of detections
4. Ask natural‑language questions about the results
5. Receive AI‑generated explanations from Gemini

The project adheres to best practices: token‑based auth, modular Django apps, scalable architecture, and production Docker setup.

---

# 🏗️ Architecture & Technical Choices

## **High-Level Architecture**
```
Next.js (Frontend)
      ↓ HTTP/JSON
Django REST Framework (Backend)
      ↓
YOLOv8 (Ultralytics) → Object Detection
Gemini 2.5 flash → Q&A / Reasoning
PostgreSQL → Authentication Storage
Docker Compose → Full system orchestration
```

---

## **Why These Technologies?**

### **Django REST Framework**
- Robust, production‑ready API framework
- Clear separation of apps (auth, detection, QA)

### **Custom User Model**
- Best practice for scalable real‑world applications
- Enables flexible authentication logic

### **YOLOv8 (Ultralytics)**
- Fast inference
- High accuracy
- Lightweight enough for containerized environments

### **Gemini LLM**
- Handles analytical reasoning over detection JSON
- Enhances user experience with natural‑language Q&A

### **Next.js **
- App Router
- Modern React framework
- Ideal for interactive dashboards

### **Docker Compose**
- One‑command startup
- Eliminates environment differences

---

# 📂 Project Structure
```
ai-image-qa-platform/
├── backend/                     # Django backend
│   ├── accounts/                # Custom user + JWT
│   ├── detection/               # YOLO detection
│   ├── qa/                      # Gemini Q&A
│   ├── core/                 # Django settings
│   ├── media/uploads/          # Input images
│   └── media/annotated/          # Annotated outputs
│
├── frontend/                    # Next.js frontend
│   ├── app/                     # pages
│   ├── components/              # reusable UI
│   └── lib/api.js               # axios wrapper
│
└── docker-compose.yml
```

---

# ⚙️ Backend Setup (Local Development)

### 1. Create virtual environment 
```bash
cd backend
python -m venv venv
source venv/bin/activate
venv\Scripts\activate.bat # if windows
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure environment variables (`backend/.env`)
```
GEMINI_API_KEY=   # get your apikey from google ai studio
DB_NAME=postgres
DB_USER=postgres
DB_PASS=postgres
DB_HOST=db
DB_PORT=5432
```

### 4. Run migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Start backend
```bash
python manage.py runserver
```

---

# 🖥️ Frontend Setup (Local)

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Start Next.js
```bash
npm run dev
```
Front-end: **http://localhost:3000**

---

# 🐳 Running with Docker Compose (Recommended)

### 1. Clone the Repository
```bash
git clone https://github.com/S-Delowar/ai-vission-platform.git
cd ai-vission-platform
```

### 2. Build & run entire system
```bash
docker-compose build
docker-compose up -d
docker-compose exec backend python manage.py migrate
```

### 3. Services will be available at:
- Frontend → **http://localhost:3000**
- Backend → **http://localhost:8000**
- PostgreSQL → port **5432**

### 4. Check containers
```bash
docker-compose ps
docker-compose logs  # check logs
```

---

# 🔑 Key API Endpoints

### **Auth**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup/` | User registration |
| POST | `/api/auth/signin/` | JWT login |

### **Detection**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/detect/upload/` | Upload image → YOLO detection |

### **Q&A (Gemini)**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/qa/` | Ask natural‑language questions |

---

# 📦 Detection Flow (YOLO)
1. User uploads an image
2. Saved to `/media/uploads/`
3. YOLOv8 model runs inference
4. Bounding boxes + confidence scores extracted
5. Annotated image saved to `/media/annotated/`
6. JSON + image URL returned

---

# 🧠 Q&A Flow (Gemini)
1. Frontend sends:
   - Image Id
   - User question
3. Backend builds structured prompt
4. Gemini produces answer
5. Returned to the frontend chat UI

---
