// Styles
import styles from './inventory.module.scss';

// React + Next
import { useEffect, useState } from 'react';
import ExportedImage from 'next-image-export-optimizer';

// MUI
import { Pagination } from '@mui/material';

// Firebase
import { ref, onValue, push, child } from 'firebase/database';
import { auth, db } from '../../../firebase/config';

// Components
import PokemonView from '@/components/pokemon-view/pokemon-view';
import PokemonTypes from '@/components/pokemon-types/pokemon-types';
import PokemonLevel from '@/components/pokemon-level/pokemon-level';
import ViewingDeck from '@/components/viewing-deck/viewing-deck';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import deckActions from '../../../store/actions/deckActions';
import cardActions from '../../../store/actions/cardActions';
import alertActions from '../../../store/actions/alertActions';

// Interfaces
import Deck from '../../../interfaces/Deck';
import Pokemon from '../../../interfaces/Pokemon';

// Constants
import { Severity } from '../../../constants/severity';

const Inventory = () => {
  const [cards, setCards] = useState<Pokemon[]>([]);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  const dispatch = useDispatch();
  const viewingDeck = useSelector((state: any) => state.deck.currentDeck);
  const viewingCard = useSelector((state: any) => state.card.currentCard);

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

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setPageNumber(page);
  }

  const addCard = (event: React.MouseEvent<unknown>, card: Pokemon) => {
    event.stopPropagation();

    // Only 1 copy of each legendary card allowed
    if (card.is_legendary && viewingDeck.cards[card.name]?.amount === 1) {
      dispatch(alertActions.setContent("Could not add card to deck. You can only have one copy of each legendary card!"));
      dispatch(alertActions.setSeverity(Severity.ERROR));
      return;
    }

    // Only 1 copy of each mythical Card allowed
    if (card.is_mythical && viewingDeck.cards[card.name]?.amount === 1) {
      dispatch(alertActions.setContent("Could not add card to deck. You can only have one copy of each mythical card!"));
      dispatch(alertActions.setSeverity(Severity.ERROR));
      return;
    }

    // Only 3 copies of each normal card allowed
    if (viewingDeck.cards[card.name]?.amount === 3) {
      dispatch(alertActions.setContent("Could not add card to deck. You already have three copies of this card in your deck!"));
      dispatch(alertActions.setSeverity(Severity.ERROR));
      return;
    }

    // Cannot have more than 30 cards in a deck
    if (viewingDeck.size >= 30) {
      dispatch(alertActions.setContent("Could not add card to deck. You already have 30 cards in your deck!"));
      dispatch(alertActions.setSeverity(Severity.ERROR));    
      return;
    }

    dispatch(deckActions.addCard(card.name));
  }

  const removeCard = (event: React.MouseEvent<unknown>, card: Pokemon) => {
    event.stopPropagation();
    dispatch(deckActions.removeCard(card.name));
  }

  const createDeck = () => {
    const newDeckKey = push(child(ref(db), 'users/' + auth.currentUser?.uid + '/decks')).key;

    if (newDeckKey) {
      const newDeck = {
        id: newDeckKey,
        name: 'New Deck',
        size: 0,
        cards: {}
      }
  
      viewDeck(newDeck);
    }
  }

  const viewDeck = (deck: Deck) => {
    dispatch(deckActions.viewDeck(JSON.parse(JSON.stringify(deck))));
  }

  const viewCard = (card: Pokemon) => {
    dispatch(cardActions.viewCard(card));
  }

  return (
    <div className={styles.container}>
      {viewingCard && <PokemonView></PokemonView>}

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
                  alt={"An image of " + card.name + "."}
                  width={128}
                  height={128}
                />

                <PokemonLevel card={card}></PokemonLevel>
                <PokemonTypes card={card}></PokemonTypes>

                {viewingDeck && 
                  <div>
                      {
                        viewingDeck?.cards[card.name]?.amount > 0 &&
                        <p className={styles.removeFromDeck} onClick={(event) => removeCard(event, card)}>x</p>
                      }
                      <p className={styles.addToDeck} onClick={(event) => addCard(event, card)}>+</p>
                  </div>
                }

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
        { 
          viewingDeck ? 
          <ViewingDeck></ViewingDeck> :
          <h1 className={styles.title}>Your Decks</h1>
        }

        {!viewingDeck && Object.values(decks).map((deck, idx) => {
          return (
            <div className={styles.deck} onClick={() => viewDeck(deck)} key={idx}>
              {deck.name}
            </div>
          )
        })}

        {!viewingDeck &&
          <div className={`${styles.deck} ${styles.newDeck}`} onClick={() => createDeck()}>
            {"Create New Deck"}
          </div>
        }
      </div>
    </div>
  )
}

export default Inventory;