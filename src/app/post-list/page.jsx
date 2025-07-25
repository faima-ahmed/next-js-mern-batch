import Link from 'next/link';
import React from 'react';

const PostList = async() => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=5`);
    const posts = await res.json();
    return (
        <div>
            <h2>All Post</h2>
            <ul>
                {posts.map((post)=>(
                <li key={post.id}>
                    <Link href={`/post-list/${post.id}`}>{post.body}</Link>
                </li>
            ))}
            </ul>
        </div>
    );
};

export default PostList;