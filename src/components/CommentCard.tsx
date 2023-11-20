"use client"
import styles from "@/css/CommentCard.module.css"
import { CommentType } from '@/models/Comment'
import Link from 'next/link';
import Avatar from './Avatar';
import { padStrLeft } from '@/utils/string';
import CommentInterBtns from "./CommentInterBtns";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CommentResponse } from "@/types/CommentTypes";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type CommentCardProps = {
    commentInfo: CommentType;
    postID: Object;
    offsetIteration: number;
    commentParents?: Object[];
    hasChildren?: boolean;
    isChild?: boolean;
}

export default function CommentCard(props: CommentCardProps) {
    const { data: session, status } = useSession();
    const date: Date = new Date(props.commentInfo.date);
    const formattedDate: string = date.getFullYear() + "/" + padStrLeft("0", 2, (date.getMonth() + 1).toString()) + "/" + padStrLeft("0", 2, date.getDate().toString()) + " - " + padStrLeft("0", 2, date.getHours().toString()) + ":" + padStrLeft("0", 2, date.getMinutes().toString());
    console.log("PARENT ID: " + props.commentInfo.textContent)
    console.log("PARENT ID: " + props.commentInfo._id)
    let comPar: Object[] = [];
    props.commentParents?.map((m) => {
        console.log("PARENTS: " + m)
        comPar.push(m)
    })
    comPar.push(props.commentInfo._id);
    const [childComments, setChildComments] = useState<CommentType[]>([]);

    useEffect(() => {
        const fetchChild = async () => {
            const data = { parentType: "Comment", data: props.commentInfo._id }
            const res = await fetch("http://localhost:3000" + "/api/getComments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })
            const com: CommentResponse = await res.json();
            setChildComments(com.comments)
        }
        fetchChild();
    },[])

    const getLikeState = () => {
        props.commentInfo.likes.map((l) => {
            if (l == session?.user._id) {
                return true;
            }
        })
        return false;
    }

    const getChild = (num: number) => {
        const r: React.ReactNode[] = [];
        childComments.map((c) => {
            r.push(<CommentCard key={c._id.toString()} postID={props.postID} commentInfo={c} commentParents={comPar} offsetIteration={num + 1} hasChildren={false} isChild={true} />)
        })
        return r;
    }

    let initLike = getLikeState();
    const offset: string = props.offsetIteration * 3 + "%";
    const commentCnt: number = props.commentInfo.commentsCount.valueOf();

    return (
        <>
            <div className={styles.wrapper} style={{ marginLeft: `${offset}` }}>
                <div className={styles.commentHeader}>
                    <Link href={`/profile/${props.commentInfo.commenterUsername}`}>
                        <Avatar />
                    </Link>
                    <Link href={`/profile/${props.commentInfo.commenterUsername}`} className={styles.username}>{props.commentInfo.commenterUsername}</Link>
                    <p className={styles.date}>{formattedDate}</p>
                </div>
                <div className={styles.text}>
                    {props.commentInfo.textContent}
                </div>
                <CommentInterBtns postID={props.postID} initialLikeState={initLike} commentID={props.commentInfo._id} commentParents={comPar} interBtnsInfo={{ likesCnt: 0, commentsCnt: 0, sharesCnt: 0 }} />
            </div>
            <div>{props.offsetIteration > 2 ? <button onClick={() => {getChild(props.offsetIteration)}}>Read More</button> : getChild(props.offsetIteration)}</div>
        </>
    )
}
