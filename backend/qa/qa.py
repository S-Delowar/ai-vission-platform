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
    
    # print(f"prompt: ===================\n{prompt}=n===========")
    
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
