import styles from "@/css/CommentCard.module.css"
import { CommentType } from '@/models/Comment'
import Link from 'next/link';
import Avatar from './Avatar';
import { padStrLeft } from '@/utils/string';
import CommentInterBtns from "./CommentInterBtns";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type CommentCardProps = {
    commentInfo: CommentType;
    postID: Object;
    commentParents?: Object[];
    offset?: string;
    hasChildren?: boolean;
    isChild?: boolean;
}

export default async function CommentCard(props: CommentCardProps) {
    const session: Session | null = await getServerSession(authOptions);
    const date: Date = new Date(props.commentInfo.date);
    const formattedDate: string = date.getFullYear() + "/" + padStrLeft("0", 2, (date.getMonth() + 1).toString()) + "/" + padStrLeft("0", 2, date.getDate().toString()) + " - " + padStrLeft("0", 2, date.getHours().toString()) + ":" + padStrLeft("0", 2, date.getMinutes().toString());

    const getLikeState = () => {
        props.commentInfo.likes.map((l) => {
            if (l == session?.user._id) {
                return true;
            }
        })
        return false;
    }

    let initLike = getLikeState();

    return (
        <div className={styles.wrapper} style={{ marginLeft: props.offset }}>
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
            <CommentInterBtns postID={props.postID} initialLikeState={initLike} commentID={props.commentInfo._id} commentParents={props.commentParents} interBtnsInfo={{ likesCnt: 0, commentsCnt: 0, sharesCnt: 0 }} />
        </div>
    )
}
