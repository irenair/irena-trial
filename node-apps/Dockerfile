FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

ENV MYSQL_HOST "mysql-set-0.svc"
ENV MYSQL_PORT "3306"
ENV MYSQL_USER "root"
ENV MYSQL_PASSWORD "1234"
ENV MYSQL_DATABASE "logging"

CMD ["node", "server.js"]