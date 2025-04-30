## Materialized Views

Materialized views are views that store the result of a query in a table. This way we can avoid the overhead of recalculating the result of the query.

An example for this is getting past statistics, since the past will not change we can calculate it once and then just query the materialized view.

```sql
CREATE MATERIALIZED VIEW past_statistics AS (
	SELECT * FROM statistics
	WHERE date < CURRENT_DATE
);
```

## Example

This query will give us all of the likes and the related post or comment

```sql
SELECT *
FROM likes
LEFT JOIN posts ON posts.id = likes.post_id
LEFT JOIN comments ON comments.id = likes.comment_id
```

Since we want to group by week we can use the `date_trunc` function.

```sql
SELECT date_trunc('week',COALESCE(posts.created_at,comments.created_at)) as week
FROM likes
LEFT JOIN posts ON posts.id = likes.post_id
LEFT JOIN comments ON comments.id = likes.comment_id
```

allowing us to group by week and count the number of likes of posts and comments.

```sql
SELECT date_trunc('week',COALESCE(posts.created_at,comments.created_at)) as week,
	COUNT(posts.id) as num_likes_of_posts,
	COUNT(comments.id) as num_likes_of_comments
FROM likes
LEFT JOIN posts ON posts.id = likes.post_id
LEFT JOIN comments ON comments.id = likes.comment_id
GROUP BY week
ORDER BY week;
```

Since this is an expensive query we can create a materialized view from it by wrapping the query in a CTE.

```sql
CREATE MATERIALIZED VIEW weekly_likes AS (
	WITH weekly_likes AS (
		SELECT date_trunc('week',COALESCE(posts.created_at,comments.created_at)) as week,
			COUNT(posts.id) as num_likes_of_posts,
			COUNT(comments.id) as num_likes_of_comments
		FROM likes
		LEFT JOIN posts ON posts.id = likes.post_id
		LEFT JOIN comments ON comments.id = likes.comment_id
	)
) WITH DATA;
```

And then we can query the materialized view instead of the original query.

```sql
SELECT * FROM weekly_likes;
```

This takes the time on my machine form 500ms to 50ms, and the cost form 100k to 0

## Refresh Materialized Views

Materialized views are refreshed when the query is run.

```sql
REFRESH MATERIALIZED VIEW weekly_likes;
```
