## Query Processing Pipeline

The query processing pipeline is the sequence of steps that PostgreSQL takes to execute a query.

1. **Parsing**

   The query is parsed into a syntax tree.

2. **Rewrite**

   The query is rewritten into a more efficient form.

3. **Planning**

   The query is planned into an execution plan.
   If there is an index that can be used, the planner will use it...

4. **Execution**

   Run.

## Understanding the Query Execution Plan

See the query plan:

```sql
EXPLAIN  SELECT * FROM users WHERE username = 'john_doe';
```

See the query plan, run and display the actual execution time:

```sql
EXPLAIN ANALYZE SELECT * FROM users WHERE username = 'john_doe';
```
