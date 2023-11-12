"use server"
import { PostType } from "@/models/Post";
import styles from "../css/PostCard.module.css"
import Avatar from "./Avatar";
import Card from "./Card";
import Link from "next/link";
import InteractionBtns from "./InteractionBtns";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

interface PostCardProps {
    post: PostType;
}

export default async function PostCard(props: PostCardProps) {
    const session = await getServerSession(authOptions);
    console.log(props.post.date)
    function padStrLeft(padStr: string, padNum: number, str: string) {
        while (str.length < padNum) {
            str = padStr.concat(str);
        }
        return str;
    }
    const date: Date = new Date(props.post.date);
    const formattedDate: string = date.getFullYear() + "/" + padStrLeft("0", 2, (date.getMonth() + 1).toString()) + "/" + padStrLeft("0", 2, date.getDate().toString()) + " - " + padStrLeft("0", 2, date.getHours().toString()) + ":" + padStrLeft("0", 2, date.getMinutes().toString());

    const seeIfLiked = async () => {
        const res = await fetch(process.env.URL + "/api/seeIfLiked", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postID: props.post._id, usernameID: session?.user._id })
        })
        const r = await res.json();
        return r.liked;
    }

    const liked = await seeIfLiked();

    return (
        <Card>
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
                <InteractionBtns postID={props.post._id} initialLikeState={liked}/>
            </div>
        </Card>
    )
}
