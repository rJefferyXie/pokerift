// Styles
import styles from './inventory.module.scss';

// React + Next
import { useEffect, useState } from 'react';
import ExportedImage from 'next-image-export-optimizer';

// Firebase
import { ref, onValue } from 'firebase/database';
import { auth, db } from '../../../firebase/config';

// Constants
import { TypeColorSchemes } from '../../../constants/pokemon';

// Interfaces
import Pokemon from '../../../interfaces/Pokemon';

const Inventory = () => {
  const [cards, setCards] = useState([]);

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

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {cards.map((card: Pokemon, idx) => {
          return (
            <div className={styles.card} key={idx}>
              <ExportedImage 
                className={styles.image}
                src={card.sprites.default}
                alt={"An image of " + card.name}
                width={128}
                height={128}
              >
              </ExportedImage>

              <div className={styles.types}>
                {card.types.map((type, idx) => {
                  return (
                    <div 
                      className={styles.type} 
                      key={idx} 
                      style={{backgroundColor: TypeColorSchemes[type.type.name]}}
                    >
                      {type.type.name}
                    </div>
                  )
                })}
              </div>
              <p 
                className={styles.name}
              >
                {card.name}
              </p>
            </div>
          )
        })}
      </div>

      <div className={styles.decks}>
        Your Decks
      </div>
    </div>
  )
}

export default Inventory;