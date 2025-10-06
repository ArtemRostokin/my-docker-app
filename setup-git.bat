@echo off
git init
git add .
git commit -m "Initial commit"
docker-compose up -d --build