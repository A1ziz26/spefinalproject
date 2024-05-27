FROM node:14-alpine

WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Command to run the React app
CMD ["npm", "start"]
