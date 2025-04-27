# Null constraints

```sql
CREATE TABLE products (
    product_no integer NOT NULL,
    name text NOT NULL,
    price numeric NOT NULL
);
```

# Default values

```sql
CREATE TABLE products (
    product_no integer NOT NULL DEFAULT 0,
    name text NOT NULL DEFAULT 'Anonymouse',
    price numeric NOT NULL DEFAULT 0
);
```

# Unique constraints

```sql
CREATE TABLE products (
    product_no integer NOT NULL,
    name text NOT NULL,
    price numeric NOT NULL,
    UNIQUE (product_no)
);
```

# Multiple columns unique constraints

```sql
CREATE TABLE products (
    product_no integer NOT NULL,
    name text NOT NULL,
    price numeric NOT NULL,
    UNIQUE (product_no, name)
);
```

# Check constraints

```sql
CREATE TABLE products (
    product_no integer NOT NULL,
    name text NOT NULL,
    price numeric NOT NULL,
    CHECK (price > 0)
);
```

# Multiple check constraints

```sql
CREATE TABLE products (
    product_no integer NOT NULL,
    name text NOT NULL,
    price numeric NOT NULL,
    CHECK (price > 0),
    CHECK (price < 1000)
);
```
