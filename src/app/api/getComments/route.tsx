import Comment, { CommentType } from "@/models/Comment";
import Post, { PostType } from "@/models/Post";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import { CommentRequest, CommentResponse } from "@/types/CommentTypes";

/*
 * @param parentType: string Tells where the data is coming from.
 * So we can query the correct DB collection. Value of "Array" means you have
 * an array of Comment ObjectIDs so we don't have to requery the DB.
 *
 * @param data: PostType | CommentType | Object[] (Array of comment ObjectIDs)
 *
 * @param maxComments: number Maximum amount of comments you will get.
 *
 * @returns json object with .comments of type CommentType[]
*/

export async function POST(req: Request) {
    const data: CommentRequest = await req.json();
    await dbConnect();
    let topComment: CommentType | PostType | null;
    let comments: Object[] | undefined;
    let maxComments: number = data.maxComments;

    if (data.parentType == "Post") {
        topComment = await Post.findById(data.data);
        comments = topComment?.comments;
    } else if (data.parentType == "Comment") {
        topComment = await Comment.findById(data.data);
        comments = topComment?.comments;
    } else if (data.parentType == "Array") {
        topComment = null;
        comments = data.data as Object[];
    }

    if (comments == undefined || comments == null) return NextResponse.json({}, { status: 300 });
    let res: CommentType[] = []

    await Promise.all(comments.map(async (c) => {
        const x: CommentType | null = await Comment.findById(c);
        if (x === null) {
        } else {
            res.push(x);

        }
    }));

    const response: CommentResponse = {comments: res}

    return NextResponse.json(response)
}
