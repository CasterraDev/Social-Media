"use client"
import { useRef, useState } from "react"
import styles from "../css/CommentBar.module.css"
import Avatar from './Avatar'
import { CommentType } from "@/models/Comment"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface CommentBarType{
    postID: string
}

export default function CommentBar(props: CommentBarType) {
    const { data: session, status } = useSession();
    const [comments, setComments] = useState<CommentType[]>([]);
    const replyTxtRef = useRef<any>();
    const router = useRouter();

    const handlePostComment = async (e: any) => {
        if (session == null){
            return;
        }
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        data.append("Username", session.user.username);
        data.append("ParentID", props.postID);
        data.append("ParentType", "Post");
        data.append("CommentText", replyTxtRef.current.innerText);
        
        const res = await fetch("/api/createComment", {
            method: "POST",
            body: data,
            })
        if (!res.ok){
            //TODO: Set error msg
            return;
        }
        replyTxtRef.current.innerText = "";
        router.refresh();
    }

    return (
        <>
            <div className={styles.commentBar}>
                <form onSubmit={handlePostComment} className={styles.commentHeader}>
                    <Avatar />
                    <div ref={replyTxtRef} className={styles.commentInput} role="textbox" spellCheck="true" contentEditable="true" placeholder="Reply" />
                    <button type="submit" className={styles.commentBtn} id="commentPost">Reply</button>
                </form>
            </div>
        </>
    )
}
