// Styling
import styles from '../styles/game.module.scss';

// React + Next
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Firebase
import { 
  database as db,
  auth
} from '../firebase/config';

// Components
import Navbar from '@/components/navbar/navbar';
import RegionPreview from '@/components/region-preview/region-preview';

const Game = () => {
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push('/hero');
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <Navbar></Navbar>

      <div className={styles.content} tabIndex={-1}>
        <RegionPreview></RegionPreview>
      </div>
    </div>
  )
}

export default Game;