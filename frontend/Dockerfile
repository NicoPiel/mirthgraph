FROM node:18.12.1-alpine as build

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build:pwa


FROM nginx:latest as deploy

COPY --from=build /usr/src/app/dist/pwa /usr/share/nginx/html

EXPOSE 80
