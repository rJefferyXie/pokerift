// Styles
import styles from './pokemon-view.module.scss';

// React + Next.JS
import { useState, useEffect } from 'react';

// Animations
import { motion, AnimatePresence } from 'framer-motion';
import fadeDown from '../../animations/fade-down';
import fadeLeft from '../../animations/fade-left';

// Interfaces
import Pokemon from '../../interfaces/Pokemon';
import ExportedImage from 'next-image-export-optimizer';
import { TypeColorSchemes, StatStrings } from '../../constants/pokemon';

// MUI
import { Button } from '@mui/material';
import { ClickAwayListener } from '@mui/material';
import { Pagination } from '@mui/material';

interface PokemonViewProps {
  card: Pokemon,
  exitView: Function
}

interface PokedexInterface {
  [key: string]: Pokemon
}

const PokemonView = (props: React.PropsWithChildren<PokemonViewProps>) => {
  const { card, exitView } = props;

  const [showingEvolutions, setShowingEvolutions] = useState(true);
  const [evolutionNumber, setEvolutionNumber] = useState(1);
  const [pokedex, setPokedex] = useState<PokedexInterface>();

  useEffect(() => {
    const pokedex = JSON.parse(localStorage.getItem('pokedex') || '');
    if (pokedex) {
      setPokedex(pokedex);
    }
  }, []);

  const handleEvolutionChange = (_: React.ChangeEvent<unknown>, evolution: number) => {
    setShowingEvolutions(false);
    setEvolutionNumber(evolution);
  }

  const exit = () => {
    exitView();
  }

  return (
    <div className={styles.overlay}>
      <AnimatePresence>
        <ClickAwayListener onClickAway={exit}>
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
            <p className={styles.highlightedText} style={{backgroundColor: TypeColorSchemes[card.types[0].type.name]}}>{card.genus}</p>

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

            {card.evolutions &&
              <div className={styles.evolutionContainer}>
                <h3 className={styles.highlightedText} style={{backgroundColor: TypeColorSchemes[card.types[0].type.name]}}>Evolution Tree</h3>
                
                <AnimatePresence onExitComplete={() => setShowingEvolutions(true)}>
                  {showingEvolutions && 
                    <motion.div 
                      key={"evolutionModal" + evolutionNumber} 
                      className={styles.evolution}
                      initial="hidden" 
                      animate="visible"                  
                      exit="exit"
                      variants={fadeLeft}
                    >
                      {(pokedex && pokedex[card.evolutions[evolutionNumber - 1].evolvesTo]) &&
                        <ExportedImage 
                          className={styles.image}
                          src={pokedex[card.evolutions[evolutionNumber - 1].evolvesTo].sprites.default} 
                          alt={"An image of " + card.evolutions[evolutionNumber - 1].evolvesTo}
                          width={128}
                          height={128}
                        />
                      }

                      {card.level && 
                        <p className={styles.evolutionInfo}>
                          {`Collect ${card.evolutions[evolutionNumber - 1].minLevel - card.level} more ${card.name.toUpperCase()} to evolve this Pokemon to ${card.evolutions[evolutionNumber - 1].evolvesTo.toUpperCase()}!`}
                        </p>
                      }

                      {card.level && 
                        <Button
                          className={card.level < card.evolutions[evolutionNumber - 1].minLevel ? styles.evolveButtonDisabled : styles.evolveButton}
                          variant='contained'
                        >
                          EVOLVE POKEMON
                        </Button>
                      }
                    </motion.div>
                  }
                </AnimatePresence>

                {card.evolutions.length > 1 &&
                  <Pagination 
                    className={styles.pagination}
                    count={Object.values(card.evolutions).length} 
                    variant="outlined" 
                    color="primary" 
                    onChange={handleEvolutionChange}
                  />
                }
              </div>
            }

          </motion.div>
        </ClickAwayListener>
      </AnimatePresence>
    </div>
  )
}

export default PokemonView;