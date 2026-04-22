import os
import json
from modules.trends import fetch_health_trends, generate_plan
from modules.images import generate_portrait_image
from modules.videos import generate_video_from_image
from modules.audio import fetch_random_bgm
from modules.composer import compose_video
from modules.youtube import upload_to_youtube

def main():
    # 0. API 키 및 환경 설정 로드
    news_api_key = os.getenv("NEWS_API_KEY")
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    stability_api_key = os.getenv("STABILITY_API_KEY")
    tube_id = os.getenv("YOUTUBE_CLIENT_ID")
    tube_secret = os.getenv("YOUTUBE_CLIENT_SECRET")
    tube_refresh = os.getenv("YOUTUBE_REFRESH_TOKEN")
    
    # 1. 트렌드 수집 및 기획
    print("--- Step 1: Planning ---")
    trends = fetch_health_trends(news_api_key)
    plan = generate_plan(trends, gemini_api_key)
    with open("plan.json", "w", encoding="utf-8") as f:
        json.dump(plan, f, ensure_ascii=False, indent=2)
    
    # 2. 이미지 및 영상 생성
    print("--- Step 2: Media Generation ---")
    os.makedirs("temp/images", exist_ok=True)
    os.makedirs("temp/videos", exist_ok=True)
    
    clip_paths = []
    for scene in plan:
        idx = scene['scene']
        img_path = f"temp/images/scene_{idx}.png"
        vid_path = f"temp/videos/scene_{idx}.mp4"
        
        print(f"Generating scene {idx}...")
        # Stability AI 이미지 생명
        generate_portrait_image(scene['image_prompt'], stability_api_key, img_path)
        # Gemini Veo 영상 변환
        generate_video_from_image(scene['image_prompt'], img_path, gemini_api_key, vid_path)
        clip_paths.append(vid_path)
        
    # 3. 배경음악 수집
    print("--- Step 3: Audio Fetching ---")
    bgm_path = "temp/bgm.mp3"
    fetch_random_bgm(bgm_path)
    
    # 4. 최종 영상 합성
    print("--- Step 4: Composing ---")
    final_video = "final_shorts.mp4"
    compose_video(clip_paths, bgm_path, final_video)
    
    # 5. 유튜브 비공개 업로드
    print("--- Step 5: Uploading ---")
    main_title = "오늘의 건강 상식: " + plan[0]['keyword']
    description = "매일 오전 10시! 당신의 건강을 위한 필수 팁.\n\n#건강 #Shorts #DailyHealth"
    keywords = [s['keyword'] for s in plan]
    
    upload_to_youtube(
        final_video, 
        main_title, 
        description, 
        keywords,
        tube_id, 
        tube_secret, 
        tube_refresh
    )
    
    print("ALL DONE! 시스템이 성공적으로 종료되었습니다.")

if __name__ == "__main__":
    main()
