FROM node:14.19

WORKDIR /app
COPY . .
COPY package*.json ./
RUN npm install
ENTRYPOINT npm start
ENV PORT=3000
EXPOSE 3000
CMD [ "npm", "start"]
