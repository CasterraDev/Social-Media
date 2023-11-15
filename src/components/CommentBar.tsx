"use client"
import { useRef, useState } from "react"
import styles from "../css/CommentBar.module.css"
import Avatar from './Avatar'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface CommentBarType {
    postID: string
}

export default function CommentBar(props: CommentBarType) {
    const { data: session } = useSession();
    const replyTxtRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string>();
    const router = useRouter();

    const handlePostComment = async (e: any) => {
        if (session == null || replyTxtRef.current == undefined) {
            return;
        }
        e.preventDefault();

        let data = { Username: session.user.username, ParentID: props.postID, ParentType: "Post", CommentText: replyTxtRef.current.innerText }

        const res = await fetch("/api/createComment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
        if (!res.ok) {
            const d = await res.json();
            setError(d.message);
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
                {error && 
                    <div>{error}</div>
                }
            </div>
        </>
    )
}
