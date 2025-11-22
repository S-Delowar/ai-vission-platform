import json
from google.genai import types

from qa.gemini_client import get_gemini_client

# get the client
client = get_gemini_client()

def ask_gemini(question, detections):
    """
    question: str
    detections: list[dict] from run_yolo_and_annotate
    annotated_image_url: optional public URL to annotated image
    returns: assistant response text
    """
    # system prompt
#     system_instruction = """
# You are an AI assistant that analyzes object detection results.

# You are always provided structured YOLO detections. Answer carefully of the questions and give an explanation.

# Rules:
# 1. ALWAYS compute bounding box width, height, area EXACTLY.
# 2. Identify largest/smallest objects based on area.
# 3. Count objects correctly using confidence thresholds.
# 4. ALWAYS base your answer ONLY on detections JSON.
# 5. NEVER hallucinate classes or numbers.
# 6. If answer cannot be computed → say: 
#    "I cannot extract the answer from the provided detections."
   
# When calculating bounding box size:
# - width = x_max – x_min
# - height = y_max – y_min
# - area = width × height
# """
    system_instruction = """
    You are an AI assistant that analyzes YOLO detection results.

    Rules:
    - Use ONLY the provided detections.
    - You MUST compute width, height, and area accurately.
    - Keep answers short and direct (1–3 sentences).
    - Provide a brief explanation (not step-by-step math).
    - If the answer cannot be determined, say:
    "I cannot extract the answer from the provided detections."
    """
    payload = {
        "detections": detections,
        "question": question
    }
    
    prompt = json.dumps(payload)
    
    print(f"prompt: ===================\n{prompt}=n===========")
    
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                {
                    "role": "user",
                    "parts": [{"text": prompt}]
                }],
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.1,
                max_output_tokens=300
            )
        )

        return response.text.strip()
    except:
        return "I am getting troubled to answer. Try again."
