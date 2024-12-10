# 프로젝트 목표
- vite 프로젝트 생성
- Firebase 역량 강화
- 소캣 통신 역량 강화
- redux 역량 강화

# 상위 디렉토리 구성
- root : Firebase-React_Chatting_App
- root/firebase_react_chatting_app/*
  - docker-compose.yml
  - version: "3.9"
    services:
      web:
        tty: true
        privileged: true
        image: node:20.11.1
        volumes:
          - ../share:/share
          - ../web:/home/web
          - /home/web/node_modules
        environment:
          - TZ=Asia/Seoul
          - WDS_SOCKET_PORT=9991
        ports:
          - "9992:80"
          - "9991:5173"
- root/web : 레포지토리 복사
- root/share : 기타 공유 폴더
