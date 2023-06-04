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

// Dtabase
import { 
  ref, 
  onValue, 
  set
} from 'firebase/database';

// Scripts
import chooseCardsByRarity from '../scripts/openCardPack';

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
    console.log("auth", auth.currentUser)
    if (!auth.currentUser) {
      router.push('/hero');
      return;
    }

    const userCardRef = ref(db, 'users/' + auth.currentUser.uid + '/cards');
    console.log("ref", userCardRef)
    onValue(userCardRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data)
        return;
      } 
        
      const compressedDeck = localStorage.getItem('kanto');
      if (compressedDeck) {
        const deck: Pokemon[] = Object.values(JSON.parse(compressedDeck));
        console.log(deck)
        const f = chooseCardsByRarity(deck, 5);
        set(ref(db, 'users/' + auth.currentUser?.uid), {
          cards: f
        })
        .then(() => {
          // Data saved successfully!
        })
        .catch((error) => {
          // The write failed...
        });
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