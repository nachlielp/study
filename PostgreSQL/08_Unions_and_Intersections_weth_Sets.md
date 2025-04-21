# Merging Results with Union

```sql
SELECT manufacturer
FROM phones
WHERE price < 170
UNION
SELECT manufacturer
FROM phones
GROUP BY manufacturer
having count(*) > 2
```
