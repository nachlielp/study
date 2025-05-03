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

in order to run multiple test in parallel we can create multiple schemas for each test file.

we have a [Context](./api/social-repo/src/test/context.js) object that is used to create a new schema for each test file, we run it before all tests and close it after all tests.

then after each test we reset the database to the initial state.

```js
let context;
beforeAll(async () => {
  context = await Context.build();
});

beforeEach(async () => {
  await context.reset();
});

afterAll(() => {
  return context.close();
});
```
