## Recursive Common Table Expressions

```
WITH RECURSIVE countdown(val) AS (
	SELECT 3 AS val -- Initial, non-recursive query
	UNION
	SELECT val - 1 FROM countdown WHERE val > 1 -- recursive query
)

SELECT *
FROM countdown;
```

1. Initial Step:

- The initial query SELECT 3 AS val executes
- The result (3) is placed in BOTH the Working Table AND the Results Table

2. First Iteration:

- The recursive query reads from the Working Table (containing 3)
- Produces 2 (val - 1 where 3 > 1)
- 2 becomes the new Working Table
- 2 is also added to the Results Table (now contains 3, 2)

3. Second Iteration:

- The recursive query reads from the Working Table (containing 2)
- Produces 1 (val - 1 where 2 > 1)
- 1 becomes the new Working Table
- 1 is also added to the Results Table (now contains 3, 2, 1)

4. Final Iteration:

- The recursive query reads from the Working Table (containing 1)
- Produces nothing (because 1 is not > 1)
- Recursion stops because no new rows were produced

5. Final Result:

- The outer SELECT retrieves all rows from the Results Table
- Returns: 3, 2, 1

## Back to our Instagram Example

```
WITH RECURSIVE suggestions(leader_id, follower_id, depth) as (
		SELECT leader_id, follower_id, 1 as depth
		FROM followers
		WHERE follower_id = 1000
	UNION
		SELECT followers.leader_id, followers.follower_id, depth + 1
		FROM followers
		JOIN suggestions ON suggestions.leader_id = followers.follower_id
		WHERE depth < 3
)

SELECT DISTINCT users.id, users.username, depth
FROM suggestions
JOIN users ON users.id = suggestions.leader_id
WHERE depth > 1
LIMIT 30;
```
