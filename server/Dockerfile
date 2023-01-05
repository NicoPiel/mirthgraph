FROM node:18.12.1-alpine as development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build


FROM node:18.12.1-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["yarn", "start:prod"]

EXPOSE 3000
