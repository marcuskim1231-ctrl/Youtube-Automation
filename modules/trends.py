import os
import requests
import google.generativeai as genai
import json

def fetch_health_trends(api_key):
    """NewsAPI를 사용하여 최신 건강 이슈 검색"""
    url = f"https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey={api_key}"
    response = requests.get(url)
    articles = response.json().get('articles', [])
    if not articles:
        return "최근 특별한 건강 뉴스가 없습니다. 일반적인 저속 노화나 혈당 습관을 주제로 정해줘."
    
    trends = "\n".join([f"- {a['title']}: {a.get('description', '')}" for a in articles[:5]])
    return trends

def generate_plan(news_context, gemini_api_key):
    """Gemini Pro를 사용하여 뉴스 기반 쇼츠 기획 생성"""
    genai.configure(api_key=gemini_api_key)
    model = genai.GenerativeModel('gemini-1.5-flash')
    
    prompt = f"""
    아래의 최신 건강 뉴스 내용을 바탕으로 1분 미만의 YouTube Shorts 기획서를 작성해줘.
    결과는 반드시 JSON 형식으로만 출력하고, 다음 구조를 지켜줘:
    [
      {{
        "scene": 1,
        "script": "한국어 대본 내용",
        "image_prompt": "Stability AI용 영어 이미지 생성 프롬프트 (9:16 비율에 적합한 묘사)",
        "keyword": "대표 키워드"
      }},
      ... (총 5개 장면)
    ]

    뉴스 맥락:
    {news_context}
    """
    
    response = model.generate_content(prompt)
    # JSON 추출 (마크다운 무시)
    content = response.text.strip()
    if "```json" in content:
        content = content.split("```json")[1].split("```")[0].strip()
    
    return json.loads(content)

if __name__ == "__main__":
    # 테스트용
    pass
