#!/bin/bash

echo "🔧 Git hooks 설치 중..."

# .git/hooks 디렉토리 확인
if [ ! -d ".git/hooks" ]; then
    echo "ℹ️ .git/hooks 디렉토리가 없어 hook 설치를 건너뜁니다"
    echo "ℹ️ Git hook이 설치되지 않았습니다. Git clone 환경에서 필요하면 'npm run install-hooks'를 다시 실행하세요."
    exit 0
fi

# pre-commit hook 복사
cp scripts/hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo "✅ Git hooks 설치 완료!"
echo "이제 포스트를 수정하고 커밋할 때 자동으로 검색 데이터가 업데이트됩니다."
