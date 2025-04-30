## Views

In order to count the unique tags a user got we currently have to do this:

```sql
SELECT username, count(*)
FROM users
JOIN (
	SELECT user_id FROM photo_tags
	UNION ALL -- include everlapping rows
	SELECT user_id FROM caption_tags
) AS tags ON tags.user_id = users.id
GROUP BY username
ORDER BY count(*) DESC;
```

We can simplify this by creating a view:

```sql
create view tags as (
	select id, created_at, user_id, post_id, 'photo_id' as type From photo_tags
	union all
	select id, created_at, user_id, post_id, 'caption_tag' as type from caption_tags
);
```

Now we can simplify the query:

```sql
SELECT username, count(*)
FROM users
JOIN tags ON tags.user_id = users.id
GROUP BY username
ORDER BY count(*) DESC;
```

## Updating Views

Views are virtual tables, they don't store data by themselves.

When we update a view, we need to specify the `OR REPLACE` option.

```sql
CREATE OR REPLACE VIEW tags AS (
	SELECT id, created_at, user_id, post_id, 'photo' as type FROM photo_tags
	UNION ALL
	SELECT id, created_at, user_id, post_id, 'caption' as type FROM caption_tags
);
```

## Dropping Views

```sql
DROP VIEW tags;
```
