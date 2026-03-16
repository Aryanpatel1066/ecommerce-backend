# 1️⃣ Choose Node base image
FROM node:18-alpine

# 2️⃣ Create app directory inside container
WORKDIR /app

# 3️⃣ Copy package files first
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy all project files
COPY . .

# 6️⃣ Expose app port
EXPOSE 8080

# 7️⃣ Start the application
CMD ["node", "server.js"]