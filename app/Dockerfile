FROM node:16

# Create directory to hold app code inside the image
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# bundle app source
COPY . .

# Bnds to port 8080
EXPOSE 8080

# command to run app
CMD ["node", "server.js"]