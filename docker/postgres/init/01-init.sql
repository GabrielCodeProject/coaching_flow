-- PostgreSQL initialization script for Coaching Flow application
-- This script runs when the database container is first created

-- Set timezone
SET timezone = 'UTC';

-- Create extensions if they don't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Grant necessary permissions to coaching_user
GRANT ALL PRIVILEGES ON DATABASE coaching_flow_db TO coaching_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO coaching_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO coaching_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO coaching_user;

-- Set default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO coaching_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO coaching_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO coaching_user;

-- Log initialization completion
\echo 'Database initialization completed for coaching_flow_db' 