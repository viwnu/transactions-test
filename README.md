# 🚀 Transactions Test - NestJS API

This is a **NestJS-based API** for handling user balance transactions with PostgreSQL and Redis. The application is designed to handle high-concurrency operations efficiently.

---

## 📌 Features

- ✅ **NestJS** framework for scalable and modular backend
- ✅ **PostgreSQL** with **Sequelize ORM** for database management
- ✅ **Redis** for caching
- ✅ **Docker & Docker Compose** for containerized deployment
- ✅ **Database migrations & seeding**
- ✅ **Concurrent transaction handling**

---

## 🛠️ Installation

### **1️⃣ Clone the repository**

```bash
git clone https://github.com/viwnu/transactions-test
cd transactions-test
```

## Running the app

### Option 1: Run Locally (Without Docker)

```bash
# Install dependencies
yarn install
```

```bash
# development
yarn run start:dev
```

```bash
# production mode
yarn build

yarn run start:prod
```

### Option 2: Run with Docker

```bash
# Build the Docker image:
docker build -t transactions-test .
```

```bash
# Run the container:
docker run --env-file .env.production -p 9000:9000 transactions-test
```

### Option 3: Run with Docker Compose (Recommended)

```bash
# Start all services (API, PostgreSQL, Redis)

docker-compose up --build
```

## The API will be available at:

http://localhost:9000

## Test

```bash

# e2e tests
yarn run test:e2e

# test coverage
yarn run test:cov

# load test
yarn global add artillery
# or
npm install -g artillery
# then
artillery run test/load-test.yml
```

## Run database migrations & seed data

```bash
# To generate a new migration:
yarn db:migration:generate-dev <migration-name>
```

```bash
# To run migrations:
yarn db:migrate-dev
```

```bash
# To seed database:
yarn db:seed-dev
```

```bash
# To rollback all seeds:
yarn db:clear-dev
```

## 📄 License

This project is unlicensed and intended for testing purposes.

## 📩 Contact

For any questions, feel free to reach out to craab@ayndex.ru.
