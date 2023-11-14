"use server"
import { PostType } from "@/models/Post";
import Card from "./Card";
import PostInfo from "./PostInfo";

interface PostCardProps {
    post: PostType;
}

export default async function PostCard(props: PostCardProps) {
    return (
        <Card>
            <PostInfo post={props.post}/>
        </Card>
    )
}
