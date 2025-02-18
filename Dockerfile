# Stage 1: Build Stage
FROM node:18 AS builder

# Set working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile && yarn cache clean

# Copy the rest of the application source code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Production Stage
FROM node:18

# Set working directory
WORKDIR /app

# Copy built app and node_modules from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
COPY .env.production ./
COPY tsconfig.json ./

# Copy the src and libs folders for runtime dependencies
COPY --from=builder /app/src ./src
COPY --from=builder /app/libs ./libs

# Copy .sequelizerc for Sequelize CLI to work
COPY --from=builder /app/.sequelizerc ./

# Install dotenv CLI to load .env variables
RUN yarn global add dotenv-cli
RUN yarn global add ts-node

# Set environment variables
ENV NODE_ENV=production

# Expose application port (default to 9000, but can be overridden via .env)
EXPOSE 9000

# Run the application using the package.json "start:prod" script
CMD ["sh", "-c", "export NODE_ENV=production && yarn start:prod"]

