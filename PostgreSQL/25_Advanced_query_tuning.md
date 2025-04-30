# Understanding Cost

Cost is the cost in units of disk page fetches.
For an indexed column, the cost is the number of pages read from the index.
For a sequential scan, the cost is the number of pages read from the table.

Side note: in a sequential scan, the pages are read in a single direction, while in an index scan, the pages are read in both directions.

Looking at the sequential scan of the comments table form the previous lecture:

```
->  Seq Scan on comments  (cost=0.00..1700.10 rows=60410 width=72) (actual time=0.053..17.338 rows=60410 loops=1)
```

we know that there are 60410 rows in the comments table.
pg also know that the size of the table is 1096 pages (Total Size / Page Size)
so we can calculate the cost of the sequential scan as:

```
cost = NUM_OF_PAGES + (NUM_OF_ROWS * 0.1)
```

```
cost = 1096 + (60410 * 0.1) = 1700.1
```

## Understanding the Query Execution Plan

Cost =

```
(# pages read sequentially * seq_page_cost) +
(# pages read at random) * random_page_cost +
(# rows scanned) * cpu_tuple_cost +
(# index entries scanned) * cpu_index_tuple_cost +
(# times function/ operator evaluated) * cpu_operator_cost
```

Notice that all of the consts are relative to the cost of a disk page read.
seq_page_cost = 1
random_page_cost = 4
cpu_tuple_cost = 0.01
cpu_index_tuple_cost = 0.005
cpu_operator_cost = 0.0025

Back to:

```
Hash Join  (cost=8.31..1867.11 rows=11 width=81) (actual time=0.446..23.957 rows=7 loops=1)
```

the cost is 8.31 for this row, and the cost to prroduce all rows is 1867.11

Indexed VS Sequential Scan
If im selecting most of the rows, then the cost of the sequential scan will be lower than the index scan.
If im selecting a few rows, then the index scan will be faster.
