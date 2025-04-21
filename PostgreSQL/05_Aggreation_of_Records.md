# Grouping and Aggregating Records

returns a table with the author name and the number of books for each author.

```sql
SELECT *, COUNT(*)
FROM authors
LEFT JOIN books ON authors.id = books.author_id
GROUP BY name;
```

# Having

The `HAVING` clause is used to filter records after the `GROUP BY` clause has been applied. It allows you to specify conditions that must be met by the aggregated results.

```sql
SELECT *, SUM(price * units_sold)
FROM phones
GROUP BY manufacturer
HAVING SUM(price * units_sold) > 2000000;
```
