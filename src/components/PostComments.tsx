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
        const data = { parentType: "Array", data: props.post.comments }
        const res = await fetch(process.env.URL + "/api/getComments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        const c: CommentResponse = await res.json();
        return c.comments;
    }

    const makeChildren = async (cl: Object, offsetInteration: number): Promise<React.ReactNode[]> => {
        let r: React.ReactNode[] = [];
        let commentParents: Object[] = [];
        commentParents.push(cl);
        let num: number = offsetInteration;
        const data = { parentType: "Comment", data: cl }
        const res = await fetch(process.env.URL + "/api/getComments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        const com: CommentResponse = await res.json();

        await Promise.all(com.comments.map(async (c: CommentType) => {
            commentParents.push(c._id);
            r.push(<CommentCard key={c._id.toString()} postID={props.post._id} commentInfo={c} commentParents={commentParents} offset={num * 3 + "%"} hasChildren={false} isChild={true} />)
            if (c.commentsCount.valueOf() > 0) {
                const t: React.ReactNode[] = await makeChildren(c, num + 1);
                r.push(t);
            }
        }));
        return r;
    }

    const getComments = async (): Promise<ReactNodeOrNestedArray[]> => {
        let r: ReactNodeOrNestedArray[] = [];
        const ct: CommentType[] = await getTopComments();
        await Promise.all(ct.map(async (c) => {
            let commentParents: Object[] = [];
            commentParents.push(c._id);
            let t: ReactNodeOrNestedArray[] = [];
            t.push(<CommentCard key={c._id.toString()} postID={props.post._id} commentInfo={c} commentParents={commentParents} />)
            if (c.commentsCount.valueOf() > 0) {
                const tt: React.ReactNode[] = await makeChildren(c._id, 1);
                t.push(tt);
            }
            r.push(t);
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
