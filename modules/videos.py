import os
import time
from google import genai
from google.genai import types

def generate_video_from_image(prompt, image_path, api_key, output_path):
    """Gemini Veo 3.1-Lite를 사용하여 이미지 -> 영상 생성"""
    client = genai.Client(api_key=api_key)
    
    # 이미지 로드
    with open(image_path, 'rb') as f:
        image_data = f.read()
    
    # 영상 생성 요청
    operation = client.models.generate_videos(
        model="veo-3.1-generate-preview",
        prompt=prompt,
        image=types.Image(image_bytes=image_data, mime_type="image/png"),
    )
    
    # 작업 완료 대기 (Polling)
    print(f"Waiting for video generation: {image_path}...")
    while not operation.done:
        time.sleep(10)
        operation = client.operations.get(operation)
    
    # 결과 다운로드
    generated_video = operation.response.generated_videos[0]
    client.files.download(file=generated_video.video)
    
    with open(output_path, "wb") as f:
        f.write(generated_video.video.video_bytes)
    
    return output_path

if __name__ == "__main__":
    pass
