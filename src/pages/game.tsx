// Styling
import styles from '../styles/game.module.scss';

// React + Next
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Firebase
import { 
  db,
  auth
} from '../firebase/config';

// Database
import { 
  ref, 
  onValue, 
  set
} from 'firebase/database';

// Scripts
import { generateStartingCards } from '../scripts/generateCards';

// Components
import Navbar from '@/components/navbar/navbar';
import RegionPreview from '@/components/region-preview/region-preview';
import Home from '@/components/game/home/home';
import Inventory from '@/components/game/inventory/inventory';
import Shop from '@/components/game/shop/shop';
import Statistics from '@/components/game/statistics/statistics';
import Settings from '@/components/game/settings/settings';
import Pokemon from '../interfaces/Pokemon';


const Game = () => {
  const [selected, setSelected] = useState('Home');
  const router = useRouter();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push('/hero');
      return;
    }

    const userCardRef = ref(db, 'users/' + auth.currentUser.uid + '/cards');
    onValue(userCardRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data)
        return;
      }

      const kantoDeck: Pokemon[] = Object.values(JSON.parse(localStorage.getItem('kanto') || ''));
      const johtoDeck: Pokemon[] = Object.values(JSON.parse(localStorage.getItem('johto') || ''));
      const hoennDeck: Pokemon[] = Object.values(JSON.parse(localStorage.getItem('hoenn') || ''));
      const sinnohDeck: Pokemon[] = Object.values(JSON.parse(localStorage.getItem('sinnoh') || ''));
      const unovaDeck: Pokemon[] = Object.values(JSON.parse(localStorage.getItem('unova') || ''));
      const kalosDeck: Pokemon[] = Object.values(JSON.parse(localStorage.getItem('kalos') || ''));
      const alolaDeck: Pokemon[] = Object.values(JSON.parse(localStorage.getItem('alola') || ''));
      const fullDeck = new Set([...kantoDeck, ...johtoDeck, ...hoennDeck, ...sinnohDeck, ...unovaDeck, ...kalosDeck, ...alolaDeck]);
      if (fullDeck) {
        const deck: Pokemon[] = Array.from(fullDeck);
        const startingCards = generateStartingCards(deck);
        set(ref(db, 'users/' + auth.currentUser?.uid), {
          cards: startingCards
        })
      }
    });
  }, [router]);

  return (
    <div className={styles.container}>
      <Navbar selectPage={setSelected}></Navbar>

      <div className={styles.content} tabIndex={-1}>
        {selected === 'Home' && <Home></Home>}

        {selected === 'Inventory' && <Inventory></Inventory>}

        {selected === 'Pokeshop' && <Shop></Shop>}

        {selected === 'Statistics' && <Statistics></Statistics>}

        {selected === 'Settings' && <Settings></Settings>}
        {/* <RegionPreview></RegionPreview> */}
      </div>
    </div>
  )
}

export default Game;