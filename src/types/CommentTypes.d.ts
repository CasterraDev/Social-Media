export type CommentRequest = {
    parentType: string;
    data: PostType | CommentType | Object[];
    maxComments: number;
}

export type CommentResponse = {
    comments: CommentType[];
}
