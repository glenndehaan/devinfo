FROM alpine:3.14

# Install packages
RUN apk add --no-cache nodejs npm

# Create app directory
WORKDIR /usr/app

# Create config volume
VOLUME ["/var/app"]

# Bundle app source
COPY . .

# Install dependencies
RUN npm ci --only=production

# Expose app
EXPOSE 4289

# Run app
CMD ["node", "./app/bundle-docker.js"]
