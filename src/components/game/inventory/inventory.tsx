// Styles
import styles from './inventory.module.scss';

// React + Next
import { useEffect, useState } from 'react';
import ExportedImage from 'next-image-export-optimizer';

// MUI
import { Pagination } from '@mui/material';

// Firebase
import { ref, update, onValue, push, child } from 'firebase/database';
import { auth, db } from '../../../firebase/config';

// Constants
import { TypeColorSchemes } from '../../../constants/pokemon';

// Interfaces
import Pokemon from '../../../interfaces/Pokemon';
import { addRandomCard } from '../../../scripts/generateCards';

const Inventory = () => {
  const [cards, setCards] = useState<Pokemon[]>([]);
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
  }, []);

  const drawCard = () => {
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
      const randomCard = addRandomCard(deck);
      update(ref(db, 'users/' + auth.currentUser?.uid + '/cards/' + cards.length), randomCard);
    }
  }

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setPageNumber(page);
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        <div className={styles.cards}>
          {cards.filter((_, idx) => ((pageNumber - 1) * 15) <= idx && idx < (pageNumber * 15)).map((card: Pokemon, idx) => {
            return (
              <div className={`${styles.card} ${card.is_legendary && styles.legendary} ${card.is_mythical && styles.mythical}`} key={idx}>
                <ExportedImage 
                  className={styles.image}
                  src={card.sprites.default}
                  alt={"An image of " + card.name}
                  width={128}
                  height={128}
                />

                <div className={styles.level}>
                  {card.level && <p className={styles.baby} style={{width: card.level / card.evolutions[0].minLevel * 100}}>{card.level + "/" + card.evolutions[0].minLevel}</p>}
                  {!card.evolutions?.length && <p className={styles.max}>MAX</p>}
                </div>

                <div className={styles.types}>
                  {card.types.map((type, idx) => (
                      <div 
                        className={styles.type} 
                        key={idx} 
                        style={{backgroundColor: TypeColorSchemes[type.type.name]}}
                      >
                        {type.type.name}
                      </div>
                    )
                  )}
                </div>
                <p className={styles.name}>
                  {card.name}
                </p>
              </div>
            )
          })}
        </div>

        <Pagination 
          className={styles.pagination}
          count={Math.ceil(cards.length / 15)} 
          variant="outlined" 
          color="primary" 
          onChange={handlePageChange}
        />
      </div>

      <div className={styles.decks}>
        <h2 className={styles.title}>Your Decks</h2>
        {/* <button onClick={() => drawCard()}>Add Random Card</button> */}
      </div>
    </div>
  )
}

export default Inventory;