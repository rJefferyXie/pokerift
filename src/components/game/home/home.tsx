// Styles
import styles from './home.module.scss';

const Home = () => {

  return (
    <div className={styles.container}>
      <button>Single Player</button>
      <button>Multi Player (coming soon)</button>
    </div>
  )
}

export default Home;