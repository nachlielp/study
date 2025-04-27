# Data Types

## Numeric Types

- SMALLINT: Range -32768 to +32767
- INTEGER: Range -2147483648 to 2147483647
- BIGINT: Range -9223372036854775808 to +9223372036854775807

- DECIMAL: 131072 digits before decimal point, 16383 after
- NUMERIC: 131072 digits before decimal point, 16383 after
- REAL: Range 1E-37 to 1E37 with at least 6 places precision
- DOUBLE PRECISION: Range 1E-307 to 1E308 with at least 15 place precision
- FLOAT: Same as real or double precision

Serial Types (Auto-incrementing):

- SMALLSERIAL: Range 1 to 32767
- SERIAL: Range 1 to 2147483647
- BIGSERIAL: Range 1 to 9223372036854775807

## Character Types

- CHAR(n): Fixed-length character string, padded with spaces
- VARCHAR: Variable-length character string, up to 1GB
- VARCHAR(n): Variable-length character string, up to n characters
- TEXT: Variable-length character string, unlimited length

## Boolean Type

- BOOLEAN: true, false, or null

Auto convert to boolean:

- true: true, t, yes, y, 1
- false: false, f, off, no, n, 0
- null: null, unknown, undefined, unknown

## Date/Time Types

- DATE: Year, month, day
- TIME: Hour, minute, second
- TIME WITH TIME ZONE: Hour, minute, second, time zone
- TIMESTAMP: Year, month, day, hour, minute, second
- TIMESTAMP WITH TIME ZONE: Year, month, day, hour, minute, second, time zone
- INTERVAL: Time interval
