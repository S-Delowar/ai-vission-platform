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
    system_instruction = (
        f'''You are an AI assistant that analyzes object detection results.

You are always provided structured YOLO detections (class name, confidence score, and bounding box coordinates). 

Your job is to:
1. Understand bounding boxes, including their width, height, and area.
2. Identify which object is largest, smallest, or highest-confidence.
3. Count objects based on conditions (e.g., “confidence above 85%”).
4. Use ONLY the provided detections — do not hallucinate.
5. Give short, accurate, well-structured answers.
6. Explain briefly how you reached the answer, referencing detection values.
7. If you have not answer about the question, say that you can not extract the answer. Do not leave with blank response (Important)

When calculating bounding box size:
- width = x_max – x_min
- height = y_max – y_min
- area = width × height

If needed, sort objects by confidence, size, or class.'''

    )
    
    # build detection content
    det_lines = []
    for d in detections:
        det_lines.append(f"class name: {d['class_name']} | confidence: {d['confidence']:.2f} | bounding box coordinates (bbox): [{d['x_min']:.1f},{d['y_min']:.1f},{d['x_max']:.1f},{d['y_max']:.1f}]")
    detections_text = "\n".join(det_lines) if det_lines else "No detections."

    prompt = (
        f"DETECTIONS:\n{detections_text}\n\n"
        f"QUESTION: {question}\n\n"
        "Provide a short answer and explain how you derived it from the detections."
    )  
    
    print(f"system-instruction: {system_instruction}")
    print(f"=============\nprompt: {prompt}")
        
    config = types.GenerateContentConfig(
        system_instruction= system_instruction,
        temperature=0.1,
        max_output_tokens=512
    )
    
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents= prompt,
        config=config
    )
    
    return response.text.strip()
