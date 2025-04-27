# Order By

LIMIT is used to limit the number of records returned.
OFFSET is used to skip the first N records.
DESC is used to sort the records in descending order.
ASC is used to sort the records in ascending order and is the default.

```sql
SELECT name
FROM phones
ORDER BY price DESC
LIMIT 2
OFFSET 1;
```

## Correlated Subqueries

- A subquery that depends on the outer query.
- The subquery is executed once for each row of the outer query.

```sql
SELECT name, department, price
FROM products AS p1
WHERE p1.price = (
  SELECT MAX(price)
  FROM products AS p2
  WHERE p1.department = p2.department
)
ORDER BY department, price DESC;
```

or

```sql
SELECT name, (
  SELECT COUNT(*)
  FROM orders AS o1
  WHERE o1.product_id = p1.id
)
FROM products AS p1
```

## FROMless Subqueries

- A subquery that is not preceded by a FROM clause.
- The subquery is executed once and the result is used in the outer query.

```sql
SELECT (
    SELECT MAX(price) FROM phones
) AS max_price,
(
    SELECT MIN(price) FROM phones
) AS min_price,
(
    SELECT AVG(price) FROM phones
) AS avg_price;

```
