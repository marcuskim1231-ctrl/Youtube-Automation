import requests
import random
import os

def fetch_random_bgm(output_path):
    """Wikimedia Commons에서 'ambient music' 관련 mp3 검색 및 무작위 다운로드"""
    search_url = "https://commons.wikimedia.org/w/api.php"
    params = {
        "action": "query",
        "format": "json",
        "list": "search",
        "srsearch": "incategory:Audio_files_of_ambient_music",
        "srlimit": 50
    }
    
    response = requests.get(search_url, params=params).json()
    search_results = response.get('query', {}).get('search', [])
    
    if not search_results:
        # 대비책: 고정된 저작권 프리 URL (예시)
        backup_url = "https://www.chosic.com/wp-content/uploads/2021/07/Rain-and-Thunder-Nature-Sounds.mp3"
        res = requests.get(backup_url)
        with open(output_path, "wb") as f:
            f.write(res.content)
        return output_path

    # 무작위 선택
    target = random.choice(search_results)
    title = target['title']
    
    # 파일 URL 가져오기
    file_info_url = "https://commons.wikimedia.org/w/api.php"
    file_params = {
        "action": "query",
        "format": "json",
        "prop": "imageinfo",
        "iiprop": "url",
        "titles": title
    }
    
    file_res = requests.get(file_info_url, params=file_params).json()
    pages = file_res.get('query', {}).get('pages', {})
    for page in pages.values():
        url = page.get('imageinfo', [{}])[0].get('url')
        if url and url.endswith('.mp3'):
            r = requests.get(url)
            with open(output_path, "wb") as f:
                f.write(r.content)
            return output_path
            
    # 실패 시 재시도 또는 백업
    return fetch_random_bgm(output_path)

if __name__ == "__main__":
    pass
