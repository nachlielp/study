## Fast Parallel Testing

### Before and After Hooks

Before we start testing, we need to connect to the database.
After we finish testing, we need to close the connection to the database.

```js
beforeAll(() => {
  return pool.connect({
    host: "localhost",
    post: 5432,
    database: "socialnetwork_test",
    user: "nach",
    password: "",
  });
});

afterAll(() => {
  return pool.close();
});
```

### Testing in Parallel

When running tests in parallel we use the following command:

```bash
npm test -- --runInBand
```

### To allow parallel testing we have a test database, and in the database we can have separate schemas for each test file.

```sql
CREATE SCHEMA test;
```

### We can work with the test schema in the following way:

```sql
SET search_path = test;
```

Or by explicitly setting the schema in the query:

```sql
SELECT * FROM test.users;
```

### Create a table in that schema:

```sql
CREATE TABLE test.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    bio TEXT
);
```

### Routing Schema access

Since we fist try to connect to a db with a machting name to the user connection, we can use the following command to connect to the test database:
