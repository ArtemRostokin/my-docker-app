@echo off
docker pull dfdfdfsdf/my-docker-app:latest
docker stop app-from-hub 2>nul
docker rm app-from-hub 2>nul
docker run -d -p 3001:3000 --name app-from-hub dfdfdfsdf/my-docker-app:latest
docker ps