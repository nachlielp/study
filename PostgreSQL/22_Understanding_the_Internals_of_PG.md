# Understanding PostgreSQL Internals

## Viewing Database in File System

To view the database directory in the file system:

```sql
show data_directory;
```

## Associating Database with File System

To associate the database with the file system:

```sql
select oid, datname
from pg_database;
```

This results in:

| oid   | datname   |
| ----- | --------- |
| 5     | postgres  |
| 16385 | nach      |
| 1     | template1 |
| 4     | template0 |
| 16391 | instagram |

## Viewing Database Objects

When examining the database (e.g., instagram), you can view all objects (tables, views, relations, etc.) with:

```sql
select oid, relname
from pg_class;
```

## Finding Specific Tables

To find a specific table (e.g., users):

```sql
select oid, relname
from pg_class
where relname = 'users';
```

This results in:

| oid   | relname |
| ----- | ------- |
| 16519 | users   |

## Locating Table Files

To find the actual file path for a table:

```sql
SELECT pg_relation_filepath('users');
```

This results in:

```
base/16391/16784
```

## Heap, Tuple (Item) and Block (Page)

Heap:

- The heap is the main storage structure for database tables.
- It contains the actual data rows.
- Heap files are typically stored in the `base/` directory.

Tuple:

- A tuple is a single row of data in a table.
- It contains the actual data values.
- Tuples are stored in the heap file.

Block (Page):

- A block is a fixed-size unit of storage in PostgreSQL.
- It contains a fixed number of tuples.
- Blocks are stored in the heap file.
- The block size is 8kB.

## Block Layout

A block is a fixed-size unit of storage in PostgreSQL.

- The block size is 8kB.
- The block layout is as follows:

```
| Header | Data |
|--------|------|
| 24 bytes | 8192 bytes |
```

- The header is 24 bytes.
- The data is 8192 bytes.
