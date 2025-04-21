# PostgreSQL Joins

PostgreSQL supports several types of joins to combine rows from two or more tables. Here are the four primary types of joins:

1. **Inner Join**

   - **Description**: Returns only the rows where the join condition is true in both tables.
   - **Example**:
     ```sql
     SELECT *
     FROM table_A
     INNER JOIN table_B ON table_A.id = table_B.id;
     ```
     Only rows satisfying the condition \( \text{table_A.id} = \text{table_B.id} \) in both tables will be included.

2. **Left (Outer) Join**

   - **Description**: Returns all rows from the left table and the matching rows from the right table. If there’s no matching row in the right table, the result will have \(\text{NULL}\) values for the right table’s columns.
   - **Example**:
     ```sql
     SELECT *
     FROM table_A
     LEFT JOIN table_B ON table_A.id = table_B.id;
     ```

3. **Right (Outer) Join**

   - **Description**: Returns all rows from the right table and the matching rows from the left table. When there's no match in the left table, the result will show \(\text{NULL}\) values for its columns.
   - **Example**:
     ```sql
     SELECT *
     FROM table_A
     RIGHT JOIN table_B ON table_A.id = table_B.id;
     ```

4. **Full (Outer) Join**
   - **Description**: Combines the results of the left and right joins. This join returns all rows when there is a match in either the left or right table. Rows without a match in one table are filled with \(\text{NULL}\) values for that table’s columns.
   - **Example**:
     ```sql
     SELECT *
     FROM table_A
     FULL OUTER JOIN table_B ON table_A.id = table_B.id;
     ```
