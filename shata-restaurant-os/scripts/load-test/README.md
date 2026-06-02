# Shata Restaurant OS — Load Testing

## Install k6

```bash
# macOS
brew install k6

# Ubuntu/Debian
sudo apt install k6

# Docker
docker run --rm -i grafana/k6 run - <scripts/load-test/menu-load.js
```

## Run Tests

### Health / Baseline
```bash
k6 run scripts/load-test/menu-load.js \
  --env BASE_URL=http://localhost:3004
```

### Full order flow
```bash
k6 run scripts/load-test/order-flow.js \
  --env BASE_URL=http://localhost:3004 \
  --env SESSION_TOKEN=<your-session-token>
```

### Against staging
```bash
k6 run scripts/load-test/menu-load.js \
  --env BASE_URL=https://api.shataos.com
```

## Thresholds (target)

| Metric | Target |
|--------|--------|
| p95 response time | < 500ms |
| Error rate | < 1% |
| Menu API (cache hit) | < 200ms |

## Bottleneck analysis after tests

```bash
# Slow queries (requires pg_stat_statements extension)
psql $DATABASE_URL -c "
  SELECT query, mean_exec_time::int AS avg_ms, calls
  FROM pg_stat_statements
  ORDER BY mean_exec_time DESC
  LIMIT 10;
"

# Redis memory
redis-cli info memory | grep used_memory_human

# Verify performance indexes
cd packages/database && npx prisma db pull 2>&1 | grep -i index
```
