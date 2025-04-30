## Simple Common Table Expressions

We can format this:

```
select u.username, t.created_at
from users as u
join (
	select user_id,created_at from caption_tags
	union all
	select user_id, created_at from photo_tags
) as t on t.user_id = u.id
where t.created_at < '2010-01-07'
order by t.created_at
```

with:

```
with tags as (
	select user_id,created_at from caption_tags
	union all
	select user_id, created_at from photo_tags
)

select u.username, t.created_at
from users as u
join tags as t on t.user_id = u.id
where t.created_at < '2010-01-07'
order by t.created_at
```
