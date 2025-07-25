#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🚀 Setting up Coaching Platform development environment...\n')

// Check if .env exists
const envPath = path.join(process.cwd(), '.env')
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!')
  console.log('📋 Please create a .env file using the template in ENVIRONMENT_SETUP.md')
  console.log('   You can copy the template and fill in your values.\n')
  process.exit(1)
}

console.log('✅ .env file found')

// Check if essential environment variables are set
const envContent = fs.readFileSync(envPath, 'utf8')
const essentialVars = [
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'STRIPE_SECRET_KEY',
  'STRIPE_PUBLISHABLE_KEY',
  'RESEND_API_KEY',
]

const missingVars = essentialVars.filter(varName => {
  const regex = new RegExp(`^${varName}=.+`, 'm')
  return !regex.test(envContent) || envContent.includes(`${varName}="your_`)
})

if (missingVars.length > 0) {
  console.log('❌ Missing or placeholder environment variables:')
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`)
  })
  console.log('\n📚 See ENVIRONMENT_SETUP.md for configuration help')
  process.exit(1)
}

console.log('✅ Essential environment variables configured')

// Run setup commands
const commands = [
  {
    name: 'Installing dependencies',
    command: 'npm install',
  },
  {
    name: 'Generating Prisma client',
    command: 'npx prisma generate',
  },
  {
    name: 'Running database migrations',
    command: 'npx prisma migrate dev --name init',
  },
]

for (const { name, command } of commands) {
  console.log(`\n📦 ${name}...`)
  try {
    execSync(command, { stdio: 'inherit' })
    console.log(`✅ ${name} completed`)
  } catch (error) {
    console.log(`❌ ${name} failed`)
    console.log(`Command: ${command}`)
    console.log(`Error: ${error.message}`)
    process.exit(1)
  }
}

// Check if we should seed the database
if (envContent.includes('SEED_DATABASE="true"')) {
  console.log('\n🌱 Seeding database with sample data...')
  try {
    // Note: This will need to be implemented when we create the seed script
    console.log('🚧 Database seeding will be available in future updates')
  } catch (error) {
    console.log('⚠️  Database seeding failed (optional step)')
  }
}

console.log('\n🎉 Setup completed successfully!')
console.log('\n📖 Next steps:')
console.log('   1. Run "npm run dev" to start the development server')
console.log('   2. Open http://localhost:3000 in your browser')
console.log('   3. Check out the PROJECT_STRUCTURE.md for development guidance')
console.log('\n💡 Useful commands:')
console.log('   - npm run db:studio    (Open database admin UI)')
console.log('   - npm run test:watch   (Run tests in watch mode)')
console.log('   - npm run lint:fix     (Fix linting issues)')
console.log('   - npm run format       (Format code with Prettier)')
