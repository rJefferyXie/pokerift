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
  set,
  get,
  child
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

    const pokedex = localStorage.getItem('pokedex');
    if (!pokedex) {
      const dbRef = ref(db);
      get(child(dbRef, 'pokedex')).then((snapshot) => {
        if (snapshot.exists()) {
          localStorage.setItem('pokedex', JSON.stringify(snapshot.val()));        
        }
      });
    }

    const userCardRef = ref(db, 'users/' + auth.currentUser.uid + '/cards');
    onValue(userCardRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data)
        return;
      }

      const pokedex = JSON.parse(localStorage.getItem('pokedex') || '');
      if (pokedex) {
        const deck: Pokemon[] = Object.values(pokedex);
        const startingCards = generateStartingCards(deck);
        set(ref(db, 'users/' + auth.currentUser?.uid + '/cards'), startingCards);

        set(ref(db, 'users/' + auth.currentUser?.uid + '/decks/0/name'), 'Starter Deck');
        startingCards.map((card: Pokemon) => {
          set(ref(db, 'users/' + auth.currentUser?.uid + '/decks/0/cards/' + card.name), card.name);
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