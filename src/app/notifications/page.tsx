import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function page() {
    const session = await getServerSession(authOptions);
    console.log(session)
    return (
        <>
            <div>Notis page {session?.user.username}</div>
        </>
    )
}
