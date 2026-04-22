import subprocess
import os

# FFmpeg 실행 경로 (환경에 맞춰 자동 탐색 또는 고정)
FFMPEG_PATH = "ffmpeg" 

def compose_video(video_clips, bgm_path, output_path):
    """
    1. 여러 영상 클립들을 하나로 합치기
    2. 배경음악 믹싱
    3. 9:16 비율(1080x1920) 보장
    """
    # 임시 리스트 파일 생성
    list_file = "clip_list.txt"
    with open(list_file, "w") as f:
        for clip in video_clips:
            f.write(f"file '{clip}'\n")
    
    # 1단계: 영상 합치기
    temp_concat = "temp_concat.mp4"
    concat_cmd = [
        FFMPEG_PATH, "-y", "-f", "concat", "-safe", "0",
        "-i", list_file, "-c", "copy", temp_concat
    ]
    subprocess.run(concat_cmd, check=True)
    
    # 2단계: BGM 믹싱 및 최종 인코딩
    # 영상 길이에 맞춰 BGM 루프 및 페이드 아웃 적용
    final_cmd = [
        FFMPEG_PATH, "-y", "-i", temp_concat, "-stream_loop", "-1", "-i", bgm_path,
        "-filter_complex", "[1:a]volume=0.4,afade=t=out:st=55:d=5[bgm];[0:v]scale=1080:1920[v]",
        "-map", "[v]", "-map", "[bgm]", "-shortest",
        "-c:v", "libx264", "-preset", "fast", "-crf", "23",
        "-c:a", "aac", "-b:a", "192k",
        output_path
    ]
    subprocess.run(final_cmd, check=True)
    
    # 임시 파일 삭제
    os.remove(list_file)
    os.remove(temp_concat)
    
    return output_path

if __name__ == "__main__":
    pass
