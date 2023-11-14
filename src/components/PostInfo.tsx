"use server"
import { PostType } from "@/models/Post";
import { padStrLeft } from "@/utils/string"
import styles from "../css/PostInfo.module.css"
import Avatar from "./Avatar";
import Link from "next/link";
import InteractionBtns from "./InteractionBtns";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { seeIfLiked } from "@/utils/dbUtils";

interface PostCardProps {
    post: PostType;
}

export default async function PostInfo(props: PostCardProps) {
    const session = await getServerSession(authOptions);
    console.log(props.post.date)

    const date: Date = new Date(props.post.date);
    const formattedDate: string = date.getFullYear() + "/" + padStrLeft("0", 2, (date.getMonth() + 1).toString()) + "/" + padStrLeft("0", 2, date.getDate().toString()) + " - " + padStrLeft("0", 2, date.getHours().toString()) + ":" + padStrLeft("0", 2, date.getMinutes().toString());

    const liked = (session != undefined) ? await seeIfLiked(props.post._id, session?.user._id) : false;

    return (
        <div className={styles.wrapper}>
            <div className={styles.postHeader}>
                <Link href={`/profile/${props.post.posterUsername}`}>
                    <Avatar />
                </Link>
                <Link href={`/profile/${props.post.posterUsername}`} className={styles.username}>{props.post.posterUsername}</Link>
                <p className={styles.date}>{formattedDate}</p>
            </div>
            <div className={styles.text}>
                {props.post.textContent}
            </div>
            <InteractionBtns postID={props.post._id} initialLikeState={liked} />
        </div>
    )
}
