FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

COPY scripts/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

EXPOSE 3000

CMD ["sh", "-c", "/wait-for-it.sh db:5432 -- npx prisma migrate dev --name init && npm run dev"]
