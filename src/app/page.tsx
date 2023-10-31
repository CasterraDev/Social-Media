import SideLinkCard from '@/components/SideLinkCard'
import styles from './page.module.css'
import PostForm from '@/components/PostForm'
import PostCard from '@/components/PostCard'

export default function Home() {
  return (
  <div className={styles.wrapper}>
    <div className={styles.links}>
        <SideLinkCard />
    </div>
    <div className={styles.mainContent}>
        <PostForm />
        <PostCard />
    </div>
  </div>
  )
}
