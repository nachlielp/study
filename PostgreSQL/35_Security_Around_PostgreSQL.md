## Security Around PostgreSQL

### Prepared Statements

A prepared statement is a precompiled SQL query that can be executed multiple times with different parameters. It is a security feature that helps prevent SQL injection attacks.

```sql
PREPARE name AS SELECT * FROM users WHERE id = $1;
EXECUTE name(1);
```

This solves the problem of SQL injection because the query is precompiled and the parameters are passed separately.
