# Notification System

## Overview

This project is a Notification System backend built with **Node.js**, **Express**, **TypeScript**, **Prisma ORM**, **Redis**, and **BullMQ**. It provides a set of API endpoints for user registration, subscription management, and sending notifications asynchronously using a queue system. Notifications can be sent via different channels like email, SMS, or push notifications.

---

## Prerequisites

Before setting up the project, ensure you have the following installed on your machine:

- **Node.js** (v14.x or later)
- **npm** (v6.x or later)
- **PostgreSQL** (v12.x or later)
- **Redis** (v5.x or later)
- **Git** (optional, for cloning the repository)

---

## Project Directory Structure

Here's the structure of the project directory:
```bash
notification-system/
│
├── prisma/
│   ├── schema.prisma            # Prisma schema file
│   ├── migrations/              # Prisma migration files
│
├── src/
│   ├── controllers/
│   │   └── notificationController.ts  # Handles API logic for notifications
│   │   └── userController.ts
│   ├── queues/
│   │   └── notificationQueue.ts  # Queue setup for notifications
│   │
│   ├── workers/
│   │   └── notificationWorker.ts # Worker to process notification job
│   │
│   ├── config/
│   │   └── redisConfig.ts         # Redis configuration
│   │
│   ├── routes/
│   │   └── notification.ts 
│   │   └── user.ts
│   ├── index.ts                   # Main entry point of the application
│
├── .env                           # Environment variables
├── .gitignore                     # Git ignore file
├── package.json                   # NPM scripts and dependencies
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation

```

---

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/notification-system.git
cd notification-system

```

### 2.Install Dependencies

Install the required npm packages:

```bash
npm install

```
### 3.Setup PostgreSQL

#### Install PostgreSQL

 ##### Windows:

* Download PostgreSQL from the official website.
* Run the installer and follow the setup instructions.
* Note down the username (postgres) and password you set during installation.

### 4.Setup the Database

Once PostgreSQL is installed and running:

####  Create a new database:

```bash
CREATE DATABASE notification_system;

```
####  Create a new user with a password:

```bash
CREATE USER your_username WITH PASSWORD 'your_password';

```
####  Grant all privileges on the database to the user:

```bash
GRANT ALL PRIVILEGES ON DATABASE notification_system TO your_username;

```

### 5.Configure Environment Variables

Create a .env file in the root directory of your project and add the following environment variables:+

```bash

PORT=5000
REDIS_HOST=localhost
REDIS_PORT=6379
DATABASE_URL="postgresql://postgres:ashu@localhost:5432/notification_system"
REDIS_URL=redis://default:<password>@<host>:<port>


```
Replace your_username and your_password with the credentials you set up in PostgreSQL.

### 6.Set Up Prisma

Prisma is used to manage the PostgreSQL database schema.

#### 1. Initialize Prisma:

```bash
npx prisma init

```
This will create a prisma folder with a schema.prisma file.

#### 2. Define Prisma Schema

Open the prisma/schema.prisma file and define the User and Subscription models: 
```bash
    // prisma/schema.prisma

    generator client {
    provider = "prisma-client-js"}

    datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL")}

    model User {
    id           Int             @id @default(autoincrement())
    name         String
    email        String          @unique
    subscriptions Subscription[]}

    model Subscription {
    id     Int    @id @default(autoincrement())
    type   String
    userId Int
    user   User   @relation(fields: [userId], references: [id])

    @@index([type])}


```
#### 3. Run Migrations
Apply the schema to the PostgreSQL database by running:
```bash
npx prisma migrate dev --name init

```

#### 4. Generate Prisma Client
Generate the Prisma Client to interact with your database:

```bash
npx prisma generate

```

### 7. Run the Project
After completing the setup, start the development server:
```bash
npm run dev

```
The server should be running at http://localhost:{POST}.

### 8. package.json 
```bash
{
  "name": "backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "@prisma/client": "^5.19.0",
    "@types/express": "^4.17.21",
    "@types/node": "^22.5.1",
    "bullmq": "^5.12.12",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "ioredis": "^5.4.1",
    "nodemon": "^3.1.4",
    "pg": "^8.12.0",
    "prisma": "^5.19.0",
    "redis": "^4.7.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.5.4"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17"
}
}

```

## API Documentation

### 1. Register a User
* Endpoint: POST /api/register
* Description: Trigger a notification to all subscribed users.

Request Body:
```bash
 {
  "name": "Ashu",
  "email": "ashu@example.com"
}

```

Response:
```bash
{
  "message": "User registered successfully",
  "user": {
    "id": 12,
    "name": "Ashu",
    "email": "ashu@example.com"
  }
}

```
### 2. Subscribe to Notifications
* Endpoint: POST /api/subscribe
* Description: Subscribe a user to notifications.

Request Body:
```bash
{
  "userId": 1,
  "type": "email"
}

```
Response:
```bash
{
  "message": "User subscribed successfully",
  "subscription": {
    "id": 1,
    "type": "email",
    "userId": 1
  }
}

```
### 3. Send Notifications
Endpoint: POST /api/notify

Request Body:
```bash
{
  "message": "Welcome to our service!"
}

```
Response:
```bash
{
  "message": "Notifications queued for all subscribed users"
}

```

---
## Detailed Explanation of Technologies Used

### Node.js
Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It enables the development of scalable network applications and is used to run the backend server in this project.

### Express
Express is a web application framework for Node.js. It provides a robust set of features for building web applications and APIs. In this project, Express is used to create the API endpoints.

### TypeScript
TypeScript is a statically typed superset of JavaScript that adds type safety to the language. It helps in catching errors during development and improving code quality. This project uses TypeScript to write the backend code.

### Prisma ORM
Prisma is an open-source ORM (Object-Relational Mapping) tool that simplifies database access and management. It provides a type-safe query builder and schema migration tools. In this project, Prisma is used to define the database schema and interact with the PostgreSQL database.

### Redis
Redis is an in-memory data structure store used as a database, cache, and message broker. It is used in this project for managing the notification queue with BullMQ.

### BullMQ
BullMQ is a library for handling distributed jobs and messages in Node.js. It uses Redis as a backend for queuing and processing jobs. In this project, BullMQ is used to queue and process notification jobs asynchronously.

---
## Deployment

### Link :

#### https://notification-system-2.onrender.com/


---
## Future Add Ons
* Validating the type of subscription
* Sending specifc notification to users subscribed for specific services
for example :- `Thankyou for subscribing to Email Service!` to user who subscribed to Email service.
* Personalised notification
For example :- `Hii Pratham, You will soon receive a SMS.` 
* Integrating with UI


## Conclusion
This README provides a comprehensive guide for setting up, configuring, and running the Notification System project.
