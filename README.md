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

notification-system/
│
├── prisma/
│   ├── schema.prisma            # Prisma schema file
│   ├── migrations/              # Prisma migration files
│
├── src/
│   ├── controllers/
│   │   └── notificationController.ts  # Handles API logic for notifications
│   │
│   ├── queues/
│   │   └── notificationQueue.ts  # Queue setup for notifications
│   │
│   ├── workers/
│   │   └── notificationWorker.ts # Worker to process notification jobs
│   │
│   ├── services/
│   │   └── notificationService.ts # Business logic for notifications
│   │
│   ├── config/
│   │   └── redisConfig.ts         # Redis configuration
│   │
│   ├── index.ts                   # Main entry point of the application
│   └── app.ts                     # Express app configuration
│
├── .env                           # Environment variables
├── .gitignore                     # Git ignore file
├── package.json                   # NPM scripts and dependencies
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation


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

#### * Create a new database:

```bash
CREATE DATABASE notification_system;

```
#### * Create a new user with a password:

```bash
CREATE USER your_username WITH PASSWORD 'your_password';

```
#### * Grant all privileges on the database to the user:

```bash
GRANT ALL PRIVILEGES ON DATABASE notification_system TO your_username;

```
#### * Access the PostgreSQL command-line interface:

```bash
sudo -u postgres psql

```

### 5.Configure Environment Variables

Create a .env file in the root directory of your project and add the following environment variables:+

```bash
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/notification_system?schema=public"
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

```
Replace your_username and your_password with the credentials you set up in PostgreSQL.

### 6.Set Up Prisma

Prisma is used to manage the PostgreSQL database schema.

#### * Initialize Prisma:

```bash
npx prisma init

```
This will create a prisma folder with a schema.prisma file.

#### * Define Prisma Schema

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
#### * Create a new database:

```bash
CREATE DATABASE notification_system;

```