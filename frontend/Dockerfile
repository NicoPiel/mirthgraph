# syntax=docker/dockerfile:1

FROM node:18.12.1 as development

RUN npm i -g yarn

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:18.12.1 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN npm i -g yarn

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
