import { CommentType } from "@/models/Comment";
import { PostType } from "@/models/Post"
import CommentCard from "./CommentCard";

interface PostCommentsProps {
    post: PostType;
}

export default async function PostComments(props: PostCommentsProps) {
    const data = { parentType: "Array", data: props.post.comments }
    const getTopComments = async (): Promise<CommentType[]> => {
        const res = await fetch(process.env.URL + "/api/getTopComments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
        const c = await res.json();
        console.log("C: " + c.comments)
        return c.comments;
    }
    const comments: (CommentType | (CommentType | CommentType[])[])[] = await getTopComments();
    const x: CommentType = comments[0] as CommentType;
    const d: CommentType[] = [x, x, x]
    const u: (CommentType | CommentType[])[] = [x,d,x]
    comments.push(u);
    const t: React.ReactNode[] = [];
    t.push(<CommentCard key={x._id.toString()} commentInfo={x} />)
    console.log("CommentS: " + comments)
    return (
        <div>
            {comments.map((c: CommentType | (CommentType | CommentType[])[]) => {
                if ('_id' in c) {
                    return (
                        <CommentCard key={c._id.toString()} commentInfo={c} />
                    )
                }else{
                    console.log("Copy")
                }
            })}
        </div>
    )
}
