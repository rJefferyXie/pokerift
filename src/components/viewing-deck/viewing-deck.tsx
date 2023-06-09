// Styles
import styles from './viewing-deck.module.scss';

// React + Next
import { useState, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import deckActions from '../../store/actions/deckActions';

// Firebase
import { ref, onValue } from 'firebase/database';
import { auth, db } from '../../firebase/config';

// MUI
import { Button } from '@mui/material';

// Interfaces
import Pokemon from '../../interfaces/Pokemon';

interface CardStringMap {
  [key: string]: Pokemon
}

const ViewingDeck = () => {
  const [cards, setCards] = useState<CardStringMap>();

  const dispatch = useDispatch();
  
  const deck = useSelector((state: any) => state.deckReducer.deck);

  const exit = () => {
    dispatch(deckActions.viewDeck(undefined));
  }

  useEffect(() => {
    if (!auth.currentUser) return;

    const userCardRef = ref(db, 'users/' + auth.currentUser.uid + '/cards');
    onValue(userCardRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const cardsObj: CardStringMap = {};

        data.map((card: Pokemon) => {
          cardsObj[card.name] = card;
        });

        setCards(cardsObj);
      } 
    });
  }, []);

  return (
    <div className={styles.container}>
      <h2>{deck.name}</h2>

      {cards && Object.keys(deck.cards).map((card, idx) => {
        return (
          <div key={idx}>
            {Object.keys(cards).includes(card) && 
              <div>
                {cards[card].name}
              </div>
            }
          </div>
        )
      })}

      <div className={styles.buttonContainer}>
        <Button 
          className={styles.exitButton} 
          variant='contained'
          onClick={exit}
        >
          Cancel
        </Button>

        <Button 
          className={styles.exitButton} 
          variant='contained'
          // onClick={exit}
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}

export default ViewingDeck;