FROM node:10

# Create a app directory
WORKDIR /usr/src/app

# Install dependencies 
COPY package*.json ./

RUN npm install

COPY ..

EXPOSE 8008

CMD ["node", "server.js"]