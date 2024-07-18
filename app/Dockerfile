FROM node:18.16.0-alpine3.17
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package.json package-lock.json /opt/app/
RUN npm install
COPY . .
EXPOSE 1337
CMD [ "npm", "start"]