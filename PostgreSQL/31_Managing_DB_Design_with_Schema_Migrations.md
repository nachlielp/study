# Migrations

Migrations include an Up and Down migration.
The Up migration is applied when the migration is run and the Down migration is applied when the migration is rolled back.

Weve created a node-pg-migration app to test migrations.

We create in PGAdmin a new db called socialnetwork.

We add a script to the package.json to trigger the migrations.

```json
"scripts": {
    "migrate": "node-pg-migrate"
}
```

Then run

```bash
npm run migrate create table comments
```

This will create a new migration file in the migrations folder looking like this:

```js
exports.up = (pgm) => {};

exports.down = (pgm) => {};
```

Then we can add to it the up and down SQL statements:

```js
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
            CREATE TABLE comments (
                id SERIAL PRIMARY KEY,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                contents VARCHAR(240) NOT NULL
            );
        `);
};

exports.down = (pgm) => {
  pgm.sql(`
            DROP TABLE comments;
        `);
};
```

The first time we need to point the node app to the db.

env

```bash
DATABASE_URL=postgres://username:password@localhost:5432/socialnetwork
```

since we dont have a password we can use the default postgres password.

```bash
DATABASE_URL=postgres://nach@localhost:5432/socialnetwork
```

Now in IOS we can run the migrations with the following command:

```bash
DATABASE_URL=postgres://nach@localhost:5432/socialnetwork npm run migrate up
```

This will create the table comments in the db.

Now we can add more migrations to the table.

We can view all the migrations with the following command:

```sql
SELECT * FROM public.pgmigrations
ORDER BY id ASC;
```

If we want to rename the contents column to body we can create a new migration file:

```bash
npm run migrate create rename contents to body
```

This will create a new migration file looking like this:

```js
exports.up = (pgm) => {
  pgm.sql(`
                ALTER TABLE comments
                RENAME COLUMN contents TO body
        `);
};

exports.down = (pgm) => {
  pgm.sql(`
        ALTER TABLE comments
        RENAME COLUMN body TO contents
`);
};
```

Now we can run the migrations with the following command:

```bash
DATABASE_URL=postgres://nach@localhost:5432/socialnetwork npm run migrate up
```
