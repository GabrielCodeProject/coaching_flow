# Docker PostgreSQL Setup for Coaching Flow

This directory contains the Docker configuration for running PostgreSQL and pgAdmin in development.

## 🚀 Quick Start

### 1. Environment Setup

The `.env.local` file should already be created with the necessary environment variables. If not, check that it contains:

```bash
DATABASE_URL="postgresql://coaching_user:coaching_secure_db_password_2024!@localhost:5432/coaching_flow_db?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-in-production-min-32-chars"
# ... other variables
```

### 2. Start Docker Services

```bash
# Start PostgreSQL and pgAdmin
docker-compose up -d

# Check if services are running
docker-compose ps

# View logs
docker-compose logs -f database
```

### 3. Run Database Migrations

```bash
# Generate Prisma client
npx prisma generate

# Run migrations to create tables
npx prisma migrate dev --name "initial-setup"

# Optional: Open Prisma Studio
npx prisma studio
```

## 📊 Database Access

### PostgreSQL Connection Details

- **Host**: localhost
- **Port**: 5433
- **Database**: coaching_flow_db
- **Username**: coaching_user
- **Password**: coaching_secure_db_password_2024!

### pgAdmin Web Interface

- **URL**: http://localhost:5050
- **Email**: admin@coaching-flow.local
- **Password**: admin_secure_password_2024!

The database server will be pre-configured in pgAdmin as "Coaching Flow Database".

## 🛠️ Common Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# Restart services
docker-compose restart

# Stop and remove all data (⚠️ DESTRUCTIVE)
docker-compose down -v

# View service status
docker-compose ps

# Access PostgreSQL CLI
docker-compose exec database psql -U coaching_user -d coaching_flow_db

# Backup database
docker-compose exec database pg_dump -U coaching_user coaching_flow_db > backup.sql

# Restore database
docker-compose exec -T database psql -U coaching_user -d coaching_flow_db < backup.sql
```

## 📁 Directory Structure

```
docker/
├── postgres/
│   └── init/
│       └── 01-init.sql    # Database initialization script
├── pgadmin/
│   └── servers.json       # pgAdmin server configuration
└── README.md              # This file
```

## 🔧 Configuration Files

### `docker-compose.yml`

Main Docker Compose configuration with:

- PostgreSQL 16 Alpine (lightweight)
- pgAdmin 4 for database management
- Health checks and dependency management
- Named volumes for data persistence
- Custom network for service communication

### `postgres/init/01-init.sql`

Initialization script that:

- Sets timezone to UTC
- Creates necessary extensions (uuid-ossp, pgcrypto)
- Grants proper permissions to coaching_user
- Sets up default privileges

### `pgadmin/servers.json`

Pre-configures pgAdmin with the database connection for convenience.

## 🔒 Security Notes

- Default passwords are set for development only
- Change all passwords before deploying to production
- The `.env.local` file is gitignored for security
- Database port 5432 is exposed only for local development

## 🐛 Troubleshooting

### Port Already in Use

If port 5432 is already in use:

```bash
# Check what's using the port
sudo lsof -i :5432

# Stop conflicting service or change port in docker-compose.yml
```

### Permission Issues

```bash
# Fix volume permissions
sudo chown -R $USER:$USER ./docker/

# Reset Docker volumes
docker-compose down -v && docker-compose up -d
```

### Database Connection Issues

```bash
# Check if database is ready
docker-compose exec database pg_isready -U coaching_user

# Check logs for errors
docker-compose logs database

# Restart database service
docker-compose restart database
```

### Auth.js Session Issues

```bash
# Verify DATABASE_URL is correct
echo $DATABASE_URL

# Check if Auth.js tables exist
npx prisma studio

# Re-run migrations if needed
npx prisma migrate reset
```

## 📋 Next Steps

After setting up the database:

1. ✅ Database is running
2. ✅ Run Prisma migrations
3. ✅ Test Auth.js authentication
4. ✅ Verify user registration works
5. ✅ Test role-based redirects

Your coaching platform is now ready for development! 🎉
