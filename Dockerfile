FROM node:16.20.0
ENV NODE_ENV=production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

CMD node server.js
