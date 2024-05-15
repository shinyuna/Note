#!/bin/bash

# 스크립트 실행 시작 메시지
echo "스크립트 실행 시작"

# 현재 브랜치 저장
current_branch=$(git rev-parse --abbrev-ref HEAD 2>&1)
if [ $? -ne 0 ]; then
  echo "현재 브랜치 확인 실패"
  exit 1
fi
echo "현재 브랜치: $current_branch"

# master 브랜치로 체크아웃
git checkout master 2>&1
if [ $? -ne 0 ]; then
  echo "master 브랜치로 체크아웃 실패"
  exit 1
fi

# dev 브랜치와 master 브랜치의 차이점 확인
commits_in_dev=$(git rev-list --not --remotes --no-merges dev..master 2>&1)
if [ $? -ne 0 ]; then
  echo "dev와 master 브랜치 차이점 확인 실패"
  exit 1
fi

# 원래 브랜치로 돌아가기
git checkout $current_branch 2>&1
if [ $? -ne 0 ]; then
  echo "원래 브랜치로 돌아가기 실패"
  exit 1
fi

# dev 브랜치에만 있는 커밋 출력
echo "dev 브랜치에만 있는 커밋:"
for commit in $commits_in_dev; do
  commit_message=$(git log --oneline --pretty=format:'%s' $commit 2>&1)
  if [ $? -eq 0 ]; then
    echo "$commit $commit_message"
  else
    echo "커밋 메시지 확인 실패: $commit"
  fi
done

echo "스크립트 실행 완료"