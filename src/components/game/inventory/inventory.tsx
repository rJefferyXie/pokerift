// Styles
import styles from './inventory.module.scss';

// React + Next
import { useEffect, useState } from 'react';
import ExportedImage from 'next-image-export-optimizer';

// MUI
import { Pagination } from '@mui/material';

// Firebase
import { ref, onValue } from 'firebase/database';
import { auth, db } from '../../../firebase/config';

// Components
import PokemonView from '@/components/pokemon-view/pokemon-view';
import PokemonTypes from '@/components/pokemon-types/pokemon-types';

// Constants
import { TypeColorSchemes } from '../../../constants/pokemon';

// Interfaces
import Deck from '../../../interfaces/Deck';
import Pokemon from '../../../interfaces/Pokemon';
import PokemonLevel from '@/components/pokemon-level/pokemon-level';

const Inventory = () => {
  const [cards, setCards] = useState<Pokemon[]>([]);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [viewing, setViewing] = useState<Pokemon>();
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (!auth.currentUser) return;

    const userCardRef = ref(db, 'users/' + auth.currentUser.uid + '/cards');
    onValue(userCardRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setCards(data);
      } 
    });

    const userDeckRef = ref(db, 'users/' + auth.currentUser.uid + '/decks');
    onValue(userDeckRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        console.log(data)
        setDecks(data);
      }
    })
  }, []);

  const viewCard = (card: Pokemon) => {
    setViewing(card);
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setPageNumber(page);
  }

  return (
    <div className={styles.container}>
      {viewing && <PokemonView card={viewing} exitView={() => setViewing(undefined)}></PokemonView>}

      <div className={styles.cardsContainer}>
        <div className={styles.cards}>
          {Object.values(cards).filter((_, idx) => ((pageNumber - 1) * 15) <= idx && idx < (pageNumber * 15)).map((card: Pokemon, idx) => {
            return (
              <div 
                className={`${styles.card} ${card.is_legendary && styles.legendary} ${card.is_mythical && styles.mythical}`} 
                onClick={() => viewCard(card)}
                key={idx}
              >
                <ExportedImage 
                  className={styles.image}
                  src={card.sprites.default}
                  alt={"An image of " + card.name}
                  width={128}
                  height={128}
                />

                <PokemonLevel card={card}></PokemonLevel>
                <PokemonTypes card={card}></PokemonTypes>

                <p className={styles.name}>
                  {card.name}
                </p>
              </div>
            )
          })}
        </div>

        <Pagination 
          className={styles.pagination}
          count={Math.ceil(Object.values(cards).length / 15)} 
          variant="outlined" 
          color="primary" 
          onChange={handlePageChange}
        />
      </div>

      <div className={styles.decks}>
        <h2 className={styles.title}>Your Decks</h2>

        {decks.map((deck, idx) => {
          return <div className={styles.deck} key={idx}>
            {deck.name}
          </div>
        })}
      </div>
    </div>
  )
}

export default Inventory;