import { Types } from "mongoose";

export const seeIfLiked = async (postID: Types.ObjectId, userID: Types.ObjectId) => {
    const res = await fetch(process.env.URL + "/api/seeIfLiked", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postID: postID, usernameID: userID })
    })
    const r = await res.json();
    return r.liked;
}
