import PostCard from "@/components/PostCard";
import { PostType } from "@/models/Post";

export default async function HomePosts() {
    const getHomePosts = async () => {
        const s = new FormData();
        s.append("search", "all");

        const res = await fetch(process.env.URL + "/api/searchPosts", {
            method: "POST",
            body: s,
        });

        if (!res.ok) {
            throw "ERROR: Searchposts failed.";
        }

        const data = await res.json();
        return data.posts;
    }

    const posts: PostType[] = await getHomePosts();

    return (
        <>
            {posts.map((post: PostType) => {
                return <PostCard key={post.posterUsername} post={post} />
            })}
        </>
    )
}
