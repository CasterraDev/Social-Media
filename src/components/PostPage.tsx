import { PostType } from "@/models/Post";
import styles from "../css/PostPage.module.css"
import Card from "./Card"
import CommentBar from "./CommentBar";
import PostInfo from "./PostInfo";
import PostComments from "./PostComments";

interface Props {
    postID: string;
}

export default async function PostPage(props: Props) {

    const data = await fetch(process.env.URL + "/api/grabPostByID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postID: props.postID })
    })
    const p = await data.json();
    const post: PostType = p.post;


    return (
        <Card>
            <PostInfo post={post} />
            <CommentBar postID={post._id.toString()} />
            <PostComments post={post}/>
        </Card>
    )
}
