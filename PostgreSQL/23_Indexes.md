# Indexes

To find a user by username we need to load all of the users from the database into memory, and then filter them by username.
To optimize this, we can create an index on the username column.

The index will store the username and its block/index location in a tree-like structure, which allows the database to quickly find the user by username.

```sql
CREATE INDEX idx_username ON users (username);
```

If index name is not provided, PostgreSQL will generate one, following the pattern `<tablename>_<columnname>_idx`.

To test the index, we can use the `EXPLAIN ANALYZE` command.

```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE username = 'john_doe';
```

## Unique Indexes

When we set a column to `UNIQUE`, PostgreSQL will automatically create a unique index on the column.
