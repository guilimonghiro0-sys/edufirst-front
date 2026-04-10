#!/bin/bash
echo "🚀 Starting Edufirst Backend..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi
echo "🗄️ Generating Prisma client..."
npm run prisma:generate
if [ ! -f "prisma/dev.db" ]; then
    echo "🗃️ Running migrations..."
    npm run prisma:migrate:dev -- --name init
    echo "🌱 Seeding database..."
    npm run prisma:seed
fi
echo "⚡ Starting development server..."
npm run start:dev