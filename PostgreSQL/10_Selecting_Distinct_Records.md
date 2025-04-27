# Selecting Distinct Records

- The DISTINCT keyword is used to remove duplicate rows from the result set.
- It is used in the SELECT, INSERT, UPDATE, and DELETE statements.
- If referenceing multiple columns, the DISTINCT keyword will remove duplicate rows based on the combination of the columns.

```sql
SELECT DISTINCT column1, column2, ...
FROM table_name;
```

```sql
SELECT COUNT(DISTINCT column1)
FROM table_name;
```
