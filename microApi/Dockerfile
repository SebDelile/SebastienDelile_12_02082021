FROM node:lts-alpine

ADD . /app/
WORKDIR /app

RUN yarn

EXPOSE 3001

CMD ["yarn", "dev"]