import styles from './page.module.css'
import PostForm from '@/components/PostForm'
import PostCard from '@/components/PostCard'
import { Session, getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route';

export default async function Home() {
    const session: Session | null = await getServerSession(authOptions);
    return (
        <>
            <PostForm username={session?.user.username ?? ""} />
            <PostCard />
        </>
    )
}
