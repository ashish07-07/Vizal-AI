# Flipzone

This project is designed to handle high-concurrency purchase requests during sales. The system ensures fairness by implementing distributed locking, queuing, and stock management, preventing overselling of items.

## Features

- **High Concurrency Handling**: Manages simultaneous purchase requests to avoid overselling.
- **Redis-Based Locking**: Uses Redis for distributed locking to ensure only one transaction is processed at a time per item.
- **Queue Management**: Queues customer requests during high-demand situations, processing them sequentially.

## Snapshots

## Creating the Flash Sale Details

![New users](./images/sale.png)

## Adding the Items details like total stock , Description and more

![New users](./images/itemdetails.png)

## Item Sale

The itemsale table in your project is designed to manage the details of items that are available for sale during specific sales events

![New users](./images/itemsale.png)

## Customer Registration Along with JWT

![New users](./images/CUSTOMER.png)

## Customer Purchase of item

![New users](./images/purchase.png)

## Setup

1. **Clone the repository:**

   ```bash
   git clone git@github.com:ashish07-07/Vizal-AI.git
   ```

```bash
  npm i
```

**Configure Environment Variables:**

Create a .env file in the root directory and set the following variables:

DATABASE_URL="postgresql://username:password@localhost:5432/databasename"

GO to dist by using the command cd dist

**Run Migrations:**

Use Prisma to set up the database schema:

```bash
  npx prisma migrate dev --name init

```

**Starting Redis using Docker**
docker run --name my-redis -d -p 6379:6379 redis

**Start the Application:**

```bash
cd dist
npm run build
npm  run start
```
