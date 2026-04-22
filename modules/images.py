import os
import requests

def generate_portrait_image(prompt, api_key, output_path):
    """Stability AI Core API를 사용하여 9:16 이미지 생성"""
    url = "https://api.stability.ai/v2beta/stable-image/generate/core"
    
    headers = {
        "authorization": f"Bearer {api_key}",
        "accept": "image/*"
    }
    
    files = {
        "prompt": (None, prompt),
        "aspect_ratio": (None, "9:16"),
        "output_format": (None, "png"),
    }
    
    response = requests.post(url, headers=headers, files=files)
    
    if response.status_code == 200:
        with open(output_path, "wb") as f:
            f.write(response.content)
        return output_path
    else:
        raise Exception(f"Image generation failed: {response.status_code} - {response.text}")

if __name__ == "__main__":
    pass
