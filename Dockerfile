FROM node:8

WORKDIR /var/app

COPY package.json ./
RUN npm install

COPY server/ ./server/
COPY dist/ ./dist/

EXPOSE 9090

CMD [ "npm", "start" ]
