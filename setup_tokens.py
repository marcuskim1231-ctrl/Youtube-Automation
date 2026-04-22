import os
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
import pickle

# 필요한 권한 (유튜브 업로드 전용 스코프)
SCOPES = ['https://www.googleapis.com/auth/youtube.upload']

def main():
    """
    1. 로컬에 client_secrets.json 파일이 있어야 합니다.
    2. 실행 시 브라우저가 열리고 로그인을 수행합니다.
    3. 최종적으로 refresh_token을 출력합니다.
    """
    flow = InstalledAppFlow.from_client_secrets_file(
        'client_secrets.json', SCOPES)
    creds = flow.run_local_server(port=0)
    
    print("\n" + "="*50)
    print("인증 성공!")
    print(f"CLIENT_ID: {creds.client_id}")
    print(f"CLIENT_SECRET: {creds.client_secret}")
    print(f"REFRESH_TOKEN: {creds.refresh_token}")
    print("="*50)
    print("\n상위 3개 값을 GitHub Secrets에 등록하세요.")

if __name__ == '__main__':
    main()
