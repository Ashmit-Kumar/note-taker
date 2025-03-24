# Step 1: Use an official Node.js image as the base image
FROM node:18 AS build

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the Vite app
RUN npm run build

# Step 7: Use a lightweight web server (like Nginx) to serve the build files
FROM nginx:alpine

# Step 8: Copy the build output from the previous build stage to Nginx's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80 to access the app
EXPOSE 80

# Step 10: Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
