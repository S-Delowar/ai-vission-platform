from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from detection.models import ImageUpload
from qa.qa import ask_gemini
from django.core.exceptions import ObjectDoesNotExist


class GeminiAQView(APIView):
    """
    Handles conversational Q&A about the YOLO detection results for a given image.
    """

    def post(self, request, *args, **kwargs):
        image_id = request.data.get('image_id')
        user_question = request.data.get('question')

        if not image_id or not user_question:
            return Response(
                {"error": "Missing image_id or question."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Safely lookup
        try:
            image_result = ImageUpload.objects.get(pk=image_id)
        except ObjectDoesNotExist:
            return Response(
                {"error": "Image result not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Extract detections
        detection_data = image_result.detections.all().order_by('-confidence')

        detections = [{
            "class_name": d.class_name,
            "confidence": float(d.confidence),
            "x_min": int(d.x_min),
            "y_min": int(d.y_min),
            "x_max": int(d.x_max),
            "y_max": int(d.y_max)
        } for d in detection_data]

        # Debug print
        print("Detection JSON:", detections)

        # Ask Gemini
        try:
            answer = ask_gemini(user_question, detections)
        except Exception as e:
            return Response(
                {"error": "AI query failed", "details": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response({"answer": answer})
