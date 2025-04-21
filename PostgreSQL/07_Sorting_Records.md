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
