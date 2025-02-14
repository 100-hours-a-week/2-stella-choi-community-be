#!/bin/bash

APP_NAME="community-be"
SCRIPT_NAME="index.js"

export NODE_ENV=production  # 환경변수 설정

# 실행 중인지 확인 (pm2 list에서 grep으로 찾기)
if pm2 list | grep -q "$APP_NAME"; then
    echo "🔄 PM2: $APP_NAME 실행 중. 재시작합니다..."
    pm2 restart $APP_NAME
else
    echo "🚀 PM2: $APP_NAME 실행되지 않음. 새로 시작합니다..."
    pm2 start $SCRIPT_NAME --name $APP_NAME --env production
fi

# 현재 실행 상태 확인
pm2 list
