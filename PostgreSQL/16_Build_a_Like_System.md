# Rules of Likes

- Each user can like each post once
- A user can unlike a post
- Can count the number of likes on a post
- List of users who liked a post
- Like none post - comments
- Dislikes

- UNIQUE(user_id, post_id)

## Likein none post - comments

1. ### Polymorphic association - cant use foreign key!

```sql
CREATE TABLE likes (
   id SERIAL PRIMARY KEY,
   user_id INTEGER NOT NULL REFERENCES users(id),
   liked_id INTEGER NOT NULL,
   liked_type VARCHAR(255) NOT NULL enum('post', 'comment'),
);
```

2. ### FK to the table, check if the post or comment exists

```sql
CREATE TABLE posts (
   id SERIAL PRIMARY KEY,
   user_id INTEGER NOT NULL REFERENCES users(id),
   post_id INTEGER NOT NULL REFERENCES posts(id),
   comment_id INTEGER NOT NULL REFERENCES comments(id),
   CHECK (coalesce(post_id, comment_id) IS NOT NULL)
);
```

3. ### Tables for liked_posts and liked_comments
