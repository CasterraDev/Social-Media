import styles from './page.module.css'
import PostForm from '@/components/PostForm'
import PostCard from '@/components/PostCard'

export default function Home() {
    return (
        <>
            <PostForm />
            <PostCard />
        </>
    )
}
