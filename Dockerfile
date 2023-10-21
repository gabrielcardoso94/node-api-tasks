FROM node:18.18.0-slim

USER node

WORKDIR /home/node/app

COPY . .

CMD ["npm", "run", "api"]