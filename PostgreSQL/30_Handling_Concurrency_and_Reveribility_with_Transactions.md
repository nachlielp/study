# Transactions

Transactions are a way to group multiple operations together.

## Transaction Isolation Levels

We can create a "Branch" of the database that is isolated from the main branch.

```sql
BEGIN;
```

This creates a new transaction.

Now any actions we take are visible to this specific connection.

When we run `COMMIT` the changes are saved to the main branch.

```sql
COMMIT;
```

If we run `ROLLBACK` the changes are not saved to the main branch.

```sql
ROLLBACK;
```

If there is an error in the transaction, it will be rolled back.
