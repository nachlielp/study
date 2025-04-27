# Greatest and Least

- The GREATEST and LEAST functions are used to return the largest and smallest values from a list of arguments.

```sql
SELECT GREATEST(value1, value2, value3, ...);
```

```sql
SELECT LEAST(value1, value2, value3, ...);
```

# Case

- The CASE statement is used to evaluate a list of conditions and return a result.

```sql

SELECT
name,
price,
CASE
    WHEN price > 100 THEN 'Expensive'
    WHEN price < 100 THEN 'Affordable'
    ELSE 'Cheap'
END;
```
