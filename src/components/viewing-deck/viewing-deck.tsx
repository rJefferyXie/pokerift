// Styles
import styles from './viewing-deck.module.scss';

// React + Next
import { useState, useEffect } from 'react';
import ExportedImage from 'next-image-export-optimizer';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import deckActions from '../../store/actions/deckActions';
import alertActions from '../../store/actions/alertActions';

// Firebase
import { ref, onValue, set } from 'firebase/database';
import { auth, db } from '../../firebase/config';

// MUI
import { Button } from '@mui/material';

// Interfaces
import Pokemon from '../../interfaces/Pokemon';

// Constants
import { Severity } from '../../constants/severity';

interface CardStringMap {
  [key: string]: Pokemon
}

const ViewingDeck = () => {
  const [cards, setCards] = useState<CardStringMap>();

  const dispatch = useDispatch();
  const deck = useSelector((state: any) => state.deck.currentDeck);

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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(deckActions.changeName(event.target.value));
  }

  const exit = () => {
    dispatch(deckActions.viewDeck(undefined));
  }

  const save = () => {
    if (deck.size !== 30) {
      dispatch(alertActions.setContent("Could not save changes. Your deck must have 30 cards."));
      dispatch(alertActions.setSeverity(Severity.ERROR));    
      return;
    }

    if (deck.name.length > 15 || deck.name.length <= 0) {
      dispatch(alertActions.setContent("Could not save changes. Your deck name must be between 1-15 characters in length."));
      dispatch(alertActions.setSeverity(Severity.ERROR));    
      return;
    }

    set(ref(db, 'users/' + auth.currentUser?.uid + '/decks/' + deck.id), {
      name: 'Starter Deck',
      size: deck.size,
      cards: deck.cards,
      id: deck.id
    });

    dispatch(deckActions.viewDeck(undefined));
    dispatch(alertActions.setContent("Your deck has been saved."));
    dispatch(alertActions.setSeverity(Severity.SUCCESS));
    console.log("Saved deck.", deck);
  }

  return (
    <div className={styles.container}>
      <input className={styles.deckName} value={deck.name} onChange={handleNameChange} type="text"></input>

      <p className={styles.deckSize}>
        {"Deck Size: " + deck.size + "/30"}
      </p>

      {cards && Object.keys(deck.cards).map((card, idx) => {
        return Object.keys(cards).includes(card) && (
          <div key={idx} className={styles.card}>
            <ExportedImage
              className={styles.image}
              src={cards[card].sprites.default}
              alt={"An image of " + cards[card].name + "."}
              width={36}
              height={36}
            />

            <p className={styles.name}>
              {cards[card].name}
            </p>

            <p className={styles.amount}>
              {"x" + deck.cards[card].amount}
            </p>
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
          className={styles.saveButton} 
          variant='contained'
          onClick={save}
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}

export default ViewingDeck;