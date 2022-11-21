FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY cliente/package*.json cliente/
RUN npm run install-cliente --omit=dev

COPY servidor/package*.json servidor/
RUN npm run install-servidor --omit=dev

COPY cliente/ cliente/

COPY servidor/ servidor/

USER node

CMD [ "npm", "run", "watch" ] 

EXPOSE 1000 3000