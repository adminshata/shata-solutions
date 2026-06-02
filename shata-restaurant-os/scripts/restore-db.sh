#!/bin/bash
# Usage: ./scripts/restore-db.sh backups/shata_YYYYMMDD_HHMMSS.sql.gz
# Requires: DATABASE_URL env var set

set -e

if [ -z "$1" ]; then
  echo "Usage: ./restore-db.sh backups/shata_YYYYMMDD_HHMMSS.sql.gz"
  exit 1
fi

if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL is not set"
  exit 1
fi

BACKUP_FILE="$1"

if [ ! -f "$BACKUP_FILE" ]; then
  echo "❌ File not found: $BACKUP_FILE"
  exit 1
fi

echo "⚠️  This will OVERWRITE the current database. Press Ctrl+C to cancel."
echo "Restoring from: $BACKUP_FILE"
sleep 3

if [[ "$BACKUP_FILE" == *.gz ]]; then
  gunzip -c "$BACKUP_FILE" | psql "$DATABASE_URL"
else
  psql "$DATABASE_URL" < "$BACKUP_FILE"
fi

echo "✅ Restored from: $BACKUP_FILE"
