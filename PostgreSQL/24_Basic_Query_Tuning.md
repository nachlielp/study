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

## Understanding the Query Execution Plan

```
Hash Join  (cost=8.31..1867.11 rows=11 width=81) (actual time=0.446..23.957 rows=7 loops=1)
  Hash Cond: (comments.user_id = users.id)
  ->  Seq Scan on comments  (cost=0.00..1700.10 rows=60410 width=72) (actual time=0.053..17.338 rows=60410 loops=1)
  ->  Hash  (cost=8.30..8.30 rows=1 width=17) (actual time=0.166..0.167 rows=1 loops=1)
        Buckets: 1024  Batches: 1  Memory Usage: 9kB
        ->  Index Scan using users_username_idx on users  (cost=0.28..8.30 rows=1 width=17) (actual time=0.136..0.138 rows=1 loops=1)
              Index Cond: ((username)::text = 'Alyson14'::text)
Planning Time: 0.574 ms
Execution Time: 24.050 ms
```

```
        ┌─ Index Cond: (username = 'Alyson14')
    ┌─ Index Scan using users_username_idx on users
┌─ Hash
│
│   ┌─ (scans all rows in comments)
├─ Seq Scan on comments
│
├─ Hash Cond: (comments.user_id = users.id)
│
Hash Join
```

-> are query nodes, as well as the first row of the query plan.

### First row

- Hash Join (type of join operation)
- cost: 8.31..1867.11 (estimated cost of the query)
- rows: 11 (estimated number of rows to be returned)
- width: 81 (estimated number of bytes to be returned for each row)
- actual time: 0.446..23.957 (actual time taken to execute the query)
- rows: 7 (actual number of rows returned)
- loops: 1 (actual number of times the query was executed)

Even without running the query, we can Estimate the rows, columns we will get. This is thanks to the statistics that PostgreSQL collects.

we can see the statistics by running:

```sql
SELECT *
FROM pg_stats
WHERE tablename = 'users';
```

For example for the username column, the average length is 13 bytes.

```

```
