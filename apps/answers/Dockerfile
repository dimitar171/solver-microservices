FROM node:alpine 

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


CMD ["node", "dist/apps/answers/main"]
