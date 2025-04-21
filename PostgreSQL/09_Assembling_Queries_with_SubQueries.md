## Embedding queries in SELECT

```sql
SELECT name, price, price / (SELECT MAX(price) FROM phones) as price_ratio
FROM phones;
```

## Embedding queries in FROM

- The sub query must have an alias.
- Im calculating the avg price then finding the max of the avg prices.

```sql
SELECT max(p.avg_price) as max_average_price
FROM (
  SELECT * ,AVG(price) as avg_price
  FROM phones
  GROUP BY manufacturer
) as p;
```

## Subqueries in WHERE

```sql
SELECT *
FROM phones
WHERE price > (
  SELECT AVG(price)
  FROM phones
);
```
