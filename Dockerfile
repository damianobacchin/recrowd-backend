FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Run database migrations
# RUN npm run db:migrate

EXPOSE 5000

CMD ["npm", "start"]