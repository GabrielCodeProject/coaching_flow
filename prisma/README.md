# Database Setup Guide

## Prerequisites

You need PostgreSQL installed and running on your system.

### Installing PostgreSQL (Ubuntu/Debian)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Installing PostgreSQL (macOS)

```bash
brew install postgresql
brew services start postgresql
```

## Database Setup

1. **Create Database User and Database**

```bash
sudo -u postgres createuser --interactive --pwprompt
# Create user: coaching_flow_user
# Set password: your_secure_password

sudo -u postgres createdb -O coaching_flow_user coaching_flow_dev
```

2. **Create Environment File**
   Create a `.env` file in the project root with:

```env
DATABASE_URL="postgresql://coaching_flow_user:your_secure_password@localhost:5432/coaching_flow_dev?schema=public"
```

3. **Run Database Migrations**

```bash
npm run db:migrate
```

4. **Generate Prisma Client**

```bash
npm run db:generate
```

## Available Database Commands

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database (development)
- `npm run db:migrate` - Create and run migrations
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:seed` - Run database seeding (when implemented)

## Schema Changes

When you modify `prisma/schema.prisma`:

1. Run `npm run db:migrate` to create a migration
2. Run `npm run db:generate` to update the Prisma client

## Connection Issues

If you encounter connection issues:

1. Ensure PostgreSQL is running: `sudo systemctl status postgresql`
2. Check database credentials in `.env`
3. Verify database exists: `sudo -u postgres psql -l`
4. Test connection: `npx prisma db pull`
