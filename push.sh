#!/bin/bash
set -e
msg="$1"
cd "$(dirname "$0")"
if [ ! -d ".git" ]
then 
  git init
  git branch -M main
  git remote add origin https://github.com/MuradAidy/devops.git 2>/dev/null || true
  echo "getting repo ready"
fi
git add .  
git commit -m "$msg"
git push origin main
echo "Pushed successfully"

