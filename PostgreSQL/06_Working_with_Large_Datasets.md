# Group By

```sql
SELECT paid, COUNT(*)
FROM orders
GROUP BY paid;
```

# Inner Join review

```sql
SELECT first_name, last_name, paid
FROM orders
JOIN users ON orders.user_id = users.id
```
