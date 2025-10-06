@echo off
git pull
docker-compose down
docker-compose up -d --build
docker ps