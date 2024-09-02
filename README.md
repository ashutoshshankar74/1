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

notification-system/ │ ├── prisma/ │ ├── schema.prisma # Prisma schema file │ ├── migrations/ # Prisma migration files │ ├── src/ │ ├── controllers/ │ │ └── notificationController.ts # Handles API logic for notifications │ │ │ ├── queues/ │ │ └── notificationQueue.ts # Queue setup for notifications │ │ │ ├── workers/ │ │ └── notificationWorker.ts # Worker to process notification jobs │ │ │ ├── services/ │ │ └── notificationService.ts # Business logic for notifications │ │ │ ├── config/ │ │ └── redisConfig.ts # Redis configuration │ │ │ ├── index.ts # Main entry point of the application │ └── app.ts # Express app configuration │ ├── .env # Environment variables ├── .gitignore # Git ignore file ├── package.json # NPM scripts and dependencies ├── tsconfig.json # TypeScript configuration └── README.md # Project documentation


---

## Setup Instructions

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/notification-system.git
cd notification-system


### 2.Install Dependencies
