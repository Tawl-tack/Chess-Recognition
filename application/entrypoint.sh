#!/bin/sh
echo "Waiting MySQL..."
until nc -z mysql 3306; do
  sleep 1
done
echo "MySQL Ready!"

echo "Sincronizing tables..."
node database/sync.js

echo "Starting Next.js..."
npm run dev
