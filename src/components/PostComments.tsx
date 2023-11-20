import { CommentType } from "@/models/Comment";
import { PostType } from "@/models/Post"
import CommentCard from "./CommentCard";
import { CommentResponse } from "@/types/CommentTypes";

interface PostCommentsProps {
    post: PostType;
}

export default async function PostComments(props: PostCommentsProps) {

    interface NestedReactNodeArray extends Array<NestedReactNodeArray | React.ReactNode> { }
    type ReactNodeOrNestedArray = React.ReactNode | NestedReactNodeArray;

    const getTopComments = async (): Promise<CommentType[]> => {
        const data = { parentType: "Post", data: props.post._id }
        const res = await fetch(process.env.URL + "/api/getComments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        const c: CommentResponse = await res.json();
        return c.comments;
    }

    const getComments = async (): Promise<ReactNodeOrNestedArray[]> => {
        let r: ReactNodeOrNestedArray[] = [];
        const ct: CommentType[] = await getTopComments();
        await Promise.all(ct.map(async (c) => {
            let commentParents: Object[] = [];
            r.push(<CommentCard key={c._id.toString()} postID={props.post._id} commentInfo={c} offsetIteration={0} commentParents={commentParents} />)
            console.log("Comment: " + c.textContent);
        }));
        return r;
    }

    const comments = await getComments();

    return (
        <div>
            {comments}
        </div>
    )
}
