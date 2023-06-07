// Styles
import styles from './pokemon-view.module.scss';

// Animations
import { motion, AnimatePresence } from 'framer-motion';
import fadeDown from '../../animations/fade-down';

// Interfaces
import Pokemon from '../../interfaces/Pokemon';
import ExportedImage from 'next-image-export-optimizer';
import { TypeColorSchemes, StatStrings } from '../../constants/pokemon';

// MUI
import { Button } from '@mui/material';

interface PokemonViewProps {
  card: Pokemon,
  exitView: Function
}

const PokemonView = (props: React.PropsWithChildren<PokemonViewProps>) => {
  const { card, exitView } = props;

  const exit = () => {
    exitView();
  }

  return (
    <div className={styles.overlay}>
      <AnimatePresence>
        <motion.div 
          className={styles.container}
          key="modal" 
          initial="hidden" 
          animate="visible" 
          exit="exit"
          variants={fadeDown}
        >

          <Button 
            className={styles.exitButton} 
            variant='contained'
            onClick={exit}
          >
            Exit
          </Button>

          <h2 className={styles.name}>{card.name}</h2>
          <p className={styles.genus} style={{backgroundColor: TypeColorSchemes[card.types[0].type.name]}}>{card.genus}</p>

          <div className={styles.wrapper}>
            <div className={styles.leftColumn}>
              <p className={styles.leftInfo}>{"Pokedex Entry #" + card.id}</p>
              <p className={styles.leftInfo}>{"Height " + card.height * 10 + "cm"}</p>
              <p className={styles.leftInfo}>{"Weight " + card.weight / 10 + "kg"}</p>
              <p className={styles.leftInfo}>Types</p>
              <div className={styles.types}>
                {card.types.map((type, idx) => {
                  return (
                    <div 
                      key={idx}
                      className={styles.type}
                      style={{backgroundColor: TypeColorSchemes[type.type.name]}}
                    >
                      {type.type.name}
                    </div>
                  )
                })}
              </div>
            </div>

            <ExportedImage
              className={styles.image}
              src={card.sprites.default}
              alt={"An image of " + card.name}
              width={240}
              height={240}
            />

            <div className={styles.rightColumn}>
              {card.stats.map((stat, idx) => {
                return (
                  <div key={idx} className={styles.stat}>
                    <p className={styles.statName}>
                      {StatStrings[idx]}
                    </p>

                    <div className={styles.statBar}>
                      <p className={styles.statValue} style={{backgroundColor: TypeColorSchemes[card.types[0].type.name], width: stat.base_stat * 0.9}}>
                        {stat.base_stat}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <p className={styles.description}>
            {card.flavor_text}
          </p>

        </motion.div>
      </AnimatePresence>

    </div>
  )
}

export default PokemonView;