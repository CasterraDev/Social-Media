"use server"
import { PostType } from "@/models/Post";
import Card from "./Card";
import PostInfo from "./PostInfo";
import Link from "next/link";

interface PostCardProps {
    post: PostType;
}

export default async function PostCard(props: PostCardProps) {
    return (
        <Link href={`post/${props.post._id}`}>
            <Card>
                <PostInfo post={props.post} />
            </Card>
        </Link>
    )
}
