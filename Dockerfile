# Use node 18 as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Install system dependencies for imagemagick and ghostscript
RUN apt-get update
RUN apt-get install -y imagemagick
RUN apt-get install -y graphicsmagick

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) to the container
COPY package*.json ./

# Install node modules, including devDependencies
RUN npm install

# Copy the TypeScript source files to the container
COPY . .

# Build the TypeScript files
RUN npm run build

COPY ./dist ./dist

# Expose port 3000 for the express server
EXPOSE 3000

# Command to start the application
CMD ["npm", "run", "start"]
