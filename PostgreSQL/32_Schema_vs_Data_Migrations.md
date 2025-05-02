## Data Migrations

Moving form lat and lng columns to a point column in itsef is a schema migration.

Moving the values from lat and lng to the point column is a data migration.

NOTICE:
Since we do migrations in transactions, the new data that is added to the main branch will not be available to the transaction that we are working on. So in our case, the locations added while the migration is runing will be lost if we group the Schema and Data migrations together.

This is mitigated by running the migration in a few steps.

1. Add the new column
2. Update the API to use both columns
3. Copy the data from the old columns to the new column
4. Update the API to use only the new column
5. Drop the old column

## Demo

1.  To test this we create a migration to add a posts table

```bash
DATABASE_URL=postgres://nach@localhost:5432/socialnetwork npm run migrate up
```

2. We add an API - checkout index.js in the node-pg-migration folder, run it and check it out at localhost:3005/posts

3. We add a migration to add the loc column

4. We run the migration

5. We update the API to use the new column

6. Data migrate the old columns to the new column, by adding to the migrations floder a [data/01-lng-lat-to-loc.js](./node-pg-migration/migrations/data/01-lng-lat-to-loc.js) file with the following content:

```js
pool
  .query(
    `
    UPDATE posts
    SET loc = POINT(lng,lat)
    WHERE loc IS NULL;
    `
  )
  .then(() => {
    console.log("Update completed");
    pool.end();
  });
```

Then we run it with:

```bash
node node-pg-migration/migrations/data/01-lng-lat-to-loc.js
```

7. We update the API to use only the new column

8. We drop the old columns

## Transaction Locks

When running an update in a transaction, every record we work on is locked until the transaction is complete. Any other transaction that tries to work on the same record will wait until the transaction is complete.

This is a problem if we have a long running transaction that needs to access the table.

By batching the data migration we can reduce the time the table is locked for.
