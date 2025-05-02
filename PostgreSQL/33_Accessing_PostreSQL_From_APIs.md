# Creating a new API

## Example #1 - social-repo

```bash
npm i dedent express jest node-pg-migrate nodemon pg pg-format supertest
```

We will start by creating a users table in the db.

```bash
npm run migrate create create-users-table
```

and move on to create an app _social-repo_ with [app.js](../PostgreSQL/api/social-repo/src/app.js), [pool.js](../PostgreSQL/api/social-repo/src/pool.js), [routes/users.js](../PostgreSQL/api/social-repo/src/routes/users.js), and [index.js](../PostgreSQL/api/social-repo/index.js)

Notice that we start the app only after the connection to the db is established.
