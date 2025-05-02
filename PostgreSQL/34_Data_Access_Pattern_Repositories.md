## Repository Pattern

The repository pattern is a design pattern that provides a way to access data from a database.

It is a layer of abstraction between the application and the database, kind of a service layer.

Our example for this is the [user-repo.js](../PostgreSQL/api/social-repo/src/repos/user-repo.js) file that we call from the [routes/users.js](../PostgreSQL/api/social-repo/src/routes/users.js) file.

## Case fixing

SQL sintaz calls for snake_case, while the JS code uses camelCase.

We can use the following code to convert the snake_case to camelCase:

```js
const parsedRows = rows.map((row) => {
  const replaced = {};

  for (let key in row) {
    const camelCase = key.replace(/([-_][a-z])/gi, ($1) =>
      $1.toUpperCase().replace("_", "")
    );
    replaced[camelCase] = row[key];
  }

  return replaced;
});
```
