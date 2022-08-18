FROM node:latest

WORKDIR /opt/raspi-controller-proxy-server

COPY package*.json ./

RUN npm install
 
COPY . .
 
EXPOSE 3000
EXPOSE 5000
 
CMD [ "npm", "start" ]