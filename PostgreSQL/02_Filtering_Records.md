Where example:

```sql
SELECT name, price * units_sold AS total_revenue FROM phones WHERE price * units_sold > 1000000;
```

Update example:

```sql
UPDATE phones SET price = 1000000 WHERE name = 'iPhone 15';
```

Delete example:

```sql
DELETE FROM phones WHERE name = 'iPhone 15';
```
