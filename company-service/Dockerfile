FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN chmod -R +x /app/node_modules/.bin/tsc

COPY . .

RUN npm run build

EXPOSE 4005

CMD [ "npm" , "start" ]
