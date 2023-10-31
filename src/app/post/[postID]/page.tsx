import PostPage from "@/components/PostPage";

export default function postID({ params }: { params: { postID: string }}) {
  return (
    <PostPage postID={params.postID} />
  )
}
