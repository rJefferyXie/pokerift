// Styles
import styles from './home.module.scss';

// React + Next
import ExportedImage from 'next-image-export-optimizer';

// Images
import singleplayer from '../../../../public/images/wallpapers/singleplayer.jpg';
import multiplayer from '../../../../public/images/wallpapers/multiplayer.jpg';

const Home = () => {

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Select a Game Mode!</h1>

      <div className={styles.buttonContainer}>
        <button className={styles.playButton} tabIndex={0}>
          <h2 className={styles.buttonText}>
            Single Player (coming soon)
          </h2>

          <ExportedImage
            className={styles.buttonImage}
            width={500}
            height={500}
            src={singleplayer.src}
            alt={"An image of charizard."}
          >
          </ExportedImage>
        </button>

        <button className={styles.playButton} tabIndex={0}>
          <h2 className={styles.buttonText}>
            Multi Player (coming soon)
          </h2>

          <ExportedImage
            className={styles.buttonImage}
            width={500}
            height={500}
            src={multiplayer.src}
            alt={"An image of charizard."}
          >
          </ExportedImage>
        </button>
      </div>
    </div>
  )
}

export default Home;