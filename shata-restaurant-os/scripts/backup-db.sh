#!/bin/bash
# Usage: ./scripts/backup-db.sh
# Requires: DATABASE_URL env var set

set -e

if [ -z "$DATABASE_URL" ]; then
  echo "❌ DATABASE_URL is not set"
  exit 1
fi

mkdir -p backups
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backups/shata_${DATE}.sql"

echo "📦 Creating backup: ${BACKUP_FILE}"
pg_dump "$DATABASE_URL" > "$BACKUP_FILE"

# Compress
gzip "$BACKUP_FILE"
echo "✅ Backup created: ${BACKUP_FILE}.gz"
echo "   Size: $(du -sh "${BACKUP_FILE}.gz" | cut -f1)"
