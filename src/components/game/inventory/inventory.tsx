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

// Components
import PokemonView from '@/components/pokemon-view/pokemon-view';

// Constants
import { TypeColorSchemes } from '../../../constants/pokemon';

// Interfaces
import Deck from '../../../interfaces/Deck';
import Pokemon from '../../../interfaces/Pokemon';
import { addRandomCard } from '../../../scripts/generateCards';

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

  const drawCard = () => {
    const deck: Pokemon[] = Array.from(Object.values(JSON.parse(localStorage.getItem('pokedex') || '')));
    if (deck) {
      const randomCard = addRandomCard(deck);
      update(ref(db, 'users/' + auth.currentUser?.uid + '/cards/' + cards.length), randomCard);
    }
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

                <div className={styles.level}>
                  {/* Pokemon can evolve. */}
                  {card.level && <p className={styles.baby} style={{width: card.level / card.evolutions[0].minLevel * 100}}>{card.level + "/" + card.evolutions[0].minLevel}</p>}

                  {/* Pokemon is fully evolved. */}
                  {(!card.evolutions?.length && !card.is_legendary && !card.is_mythical) && <p className={styles.max}>MAX</p>}

                  {card.is_mythical && <p className={styles.mythical}>MYTHICAL</p>}
                  {card.is_legendary && <p className={styles.legendary}>LEGENDARY</p>}
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
        {/* <button onClick={() => drawCard()}>Add Random Card</button> */}
      </div>
    </div>
  )
}

export default Inventory;