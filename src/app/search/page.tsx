"use client"
import PostCard from "@/components/PostCard";
import styles from "@/css/Search.module.css"
import { PostType } from "@/models/Post"
import { useState } from "react";

export default function Search() {
    const [posts, setPosts] = useState<PostType[]>([]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const s = new FormData(e.currentTarget);

        const res = await fetch("/api/searchPosts", {
            method: "POST",
            body: s,
        });

        if (!res.ok) {
            throw "ERROR: Searchposts failed.";
        }

        const data = await res.json();
        setPosts(data.posts);
    }

    return (
        <div className={styles.searchWrapper}>
            <form onSubmit={handleSubmit}>
                <input type="text" name="search" className={styles.searchInput} placeholder="Search" />
            </form>
            {posts.map((post: PostType) => {
                return <PostCard key={post.posterUsername} post={post} />
            })}
        </div>
    )
}
