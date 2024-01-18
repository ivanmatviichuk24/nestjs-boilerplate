FROM node

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json
COPY webpack.config.js webpack.config.js

RUN npm install -g pnpm

COPY apps/users apps/users
COPY libs libs


RUN cd ./apps/users

RUN pnpm install -r
