```sql
CREATE TABLE users (
	id serial primary key,
	created_at timestamp with time zone default current_timestamp,
	updated_at timestamp with time zone default current_timestamp,
	username varchar(30) not null,
	bio varchar(400),
	avatar varchar(200),
	phone varchar(25),
	email varchar(40),
	password varchar(50),
	status varchar(15),
	check(coalesce(phone,email) is not null)
);
```

```sql
CREATE TABLE posts (
	id serial primary key,
	created_at timestamp with time zone default current_timestamp,
	updated_at timestamp with time zone default current_timestamp,
	url varchar(200) not null,
	caption varchar(240),
	lat real check (lat is null or (lat >= -90 and lat <=90)),
	lng real check (lng is null or (lng >= -180 and lng <=180)),
	user_id integer not null references users(id) on delete cascade
);
```

```sql
CREATE TABLE comments (
	id serial primary key,
	created_at timestamp with time zone default current_timestamp,
	updated_at timestamp with time zone default current_timestamp,
	contents varchar(240) not null,
	user_id integer not null references users(id) on delete cascade,
	post_id integer not null references posts(id) on delete cascade
);
```

```sql
CREATE TABLE likes (
	id serial primary key,
	created_at timestamp with time zone default current_timestamp,
	user_id integer not null references users(id) on delete cascade,
	post_id integer not null references posts(id) on delete cascade,
	comment_id integer references comments(id) on delete cascade,
	check(
		coalesce((post_id)::boolean::integer,0)
		+
		coalesce((comment_id)::boolean::integer,0)
		=1
	),
	unique(user_id,post_id,comment_id)
);
```

```sql
CREATE TABLE photo_tags (
	id serial primary key,
	created_at timestamp with time zone default current_timestamp,
	updated_at timestamp with time zone default current_timestamp,
	user_id integer not null references users(id) on delete cascade,
	post_id integer not null references posts(id) on delete cascade,
	x integer not null,
	y integer not null,
	unique(user_id,post_id)
);
```

```sql
CREATE TABLE caption_tags (
	id serial primary key,
	created_at timestamp with time zone default current_timestamp,
	user_id integer not null references users(id) on delete cascade,
	post_id integer not null references posts(id) on delete cascade,
	unique(user_id,post_id)
);
```

```sql
CREATE TABLE comment_tags (
	id serial primary key,
	created_at timestamp with time zone default current_timestamp,
	user_id integer not null references users(id) on delete cascade,
	comment_id integer not null references comments(id) on delete cascade,
	unique(user_id,comment_id)
);
```

```sql
CREATE TABLE hashtags (
	id serial primary key,
	created_at timestamp with time zone default current_timestamp,
	title varchar(20) not null unique
);
```

```sql
CREATE TABLE hashtags_posts (
	id serial primary key,
	hashtag_id integer not null references hashtags(id) on delete cascade,
	post_id integer not null references posts(id) on delete cascade,
	unique(hashtag_id, post_id)
);
```

```sql
CREATE TABLE followers (
	id serial primary key,
	created_at timestamp with time zone default current_timestamp,
	leader_id integer not null references users(id) on delete cascade,
	follower_id integer not null references users(id) on delete cascade,
	unique(leader_id, follower_id)
);
```
