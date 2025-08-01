#!/bin/bash

echo "🔧 Git hooks 설치 중..."

# .git/hooks 디렉토리 확인
if [ ! -d ".git/hooks" ]; then
    echo "❌ 오류: Git 저장소가 아니거나 .git/hooks 디렉토리가 없습니다"
    exit 1
fi

# pre-commit hook 복사
cp scripts/hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo "✅ Git hooks 설치 완료!"
echo "이제 포스트를 수정하고 커밋할 때 자동으로 검색 데이터가 업데이트됩니다."
