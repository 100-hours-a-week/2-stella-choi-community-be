#!/bin/bash

# .env 파일 경로
ENV_FILE="$(dirname "$0")/../.env.local"

# .env 파일 로드
if [ -f "$ENV_FILE" ]; then
    source "$ENV_FILE"
else
    echo ".env file not found at $ENV_FILE"
    exit 1
fi

# 로컬 로그 디렉토리 경로
LOG_DIR=$(realpath "$(dirname "$0")/../config/logs")

# API 베이스 URL
API_BASE_URL="$API_BASE_URL" # .env 파일에서 가져온 값

# 현재 날짜 기준 어제 날짜 구하기
if date --version >/dev/null 2>&1; then
    # GNU date
    YESTERDAY=$(date -d "yesterday" +"%Y-%m-%d")
else
    # macOS/BSD date
    YESTERDAY=$(date -v-1d +"%Y-%m-%d")
fi

echo "Processing yesterday: $YESTERDAY"

# 각 디렉토리에 대해 루프 실행
for CATEGORY_DIR in "$LOG_DIR"/*/; do
    echo "Processing CATEGORY_DIR: $CATEGORY_DIR"

    # 디렉토리가 아닐 경우 스킵
    [ -d "$CATEGORY_DIR" ] || continue

    # 디렉토리 이름에서 카테고리 추출
    CATEGORY=$(basename "$CATEGORY_DIR")

    echo "Processing category: $CATEGORY"

    # 어제 날짜의 로그 파일 찾기 및 전송
    for file in "$CATEGORY_DIR"/${YESTERDAY}*.log; do
        # 파일이 존재하지 않으면 스킵
        [ -e "$file" ] || continue

        echo "Sending file: $file"

        # API 호출
        response=$(curl -s -w "%{http_code}" -o /dev/null -X POST "$API_BASE_URL/$CATEGORY" \
            -F "category=$CATEGORY" \
            -F "log=@$file")

        # 전송 성공 시 파일 삭제
        if [ "$response" -eq 200 ]; then
            echo "Uploaded and removed: $file"
            rm -f "$file"
        else
            echo "Failed to upload $file. HTTP Response Code: $response"
        fi
    done
done