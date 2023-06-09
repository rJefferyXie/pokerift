// Styles
import styles from './pokemon-view.module.scss';

// React + Next.JS
import { useState, useEffect } from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import cardActions from '../../store/actions/cardActions';

// Components
import PokemonStats from '../pokemon-stats/pokemon-stats';
import PokemonTypes from '../pokemon-types/pokemon-types';
import PokemonLevel from '../pokemon-level/pokemon-level';

// Animations
import { motion, AnimatePresence } from 'framer-motion';
import fadeDown from '../../animations/fade-down';
import fadeLeft from '../../animations/fade-left';

// Interfaces
import Pokemon from '../../interfaces/Pokemon';
import ExportedImage from 'next-image-export-optimizer';
import { TypeColorSchemes } from '../../constants/pokemon';

// MUI
import { Button } from '@mui/material';
import { ClickAwayListener } from '@mui/material';
import { Pagination } from '@mui/material';

interface PokedexInterface {
  [key: string]: Pokemon
}

interface EvolutionInterface {
  evolvesTo: string,
  minLevel: number
}

const PokemonView = () => {
  const [showingEvolutions, setShowingEvolutions] = useState(true);
  const [evolution, setEvolution] = useState<EvolutionInterface>();
  const [pokedex, setPokedex] = useState<PokedexInterface>();

  const dispatch = useDispatch();
  
  const card = useSelector((state: any) => state.cardReducer.card);

  const exit = () => {
    dispatch(cardActions.viewCard(undefined));
  }

  useEffect(() => {
    const pokedex = JSON.parse(localStorage.getItem('pokedex') || '');
    if (pokedex) {
      setPokedex(pokedex);
    }

    if (card.evolutions?.length) {
      setEvolution(card.evolutions[0]);
    }
  }, [card.evolutions]);

  const handleEvolutionChange = (_: React.ChangeEvent<unknown>, evolutionNumber: number) => {
    setShowingEvolutions(false);
    setEvolution(card.evolutions[evolutionNumber - 1]);
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
                <PokemonTypes card={card}></PokemonTypes>
              </div>

              <ExportedImage
                className={styles.image}
                src={card.sprites.default}
                alt={"An image of " + card.name}
                width={240}
                height={240}
              />

              <div className={styles.rightColumn}>
                <PokemonStats card={card}></PokemonStats>
              </div>
            </div>

            <p className={styles.description}>
              {card.flavor_text}
            </p>

            {(card.evolutions && evolution) && 
              <div className={styles.evolutionContainer}>
                <h3 className={styles.highlightedText} style={{backgroundColor: TypeColorSchemes[card.types[0].type.name]}}>Evolution Tree</h3>
                
                <AnimatePresence onExitComplete={() => setShowingEvolutions(true)}>
                  {showingEvolutions && 
                    <motion.div 
                      key={"evolutionModal" + evolution.evolvesTo} 
                      className={styles.evolution}
                      initial="hidden" 
                      animate="visible"                  
                      exit="exit"
                      variants={fadeLeft}
                    >
                      {(pokedex && pokedex[evolution.evolvesTo]) &&
                        <ExportedImage 
                          className={styles.image}
                          src={pokedex[evolution.evolvesTo].sprites.default} 
                          alt={"An image of " + evolution.evolvesTo}
                          width={128}
                          height={128}
                        />
                      }

                      <PokemonLevel card={card}></PokemonLevel>

                      <p className={styles.evolutionInfo}>
                        {`Collect ${evolution.minLevel - card.level} more ${card.name.toUpperCase()} to evolve this Pokemon to ${evolution.evolvesTo.toUpperCase()}!`}
                      </p>

                      <Button
                        className={card.level < evolution.minLevel ? styles.evolveButtonDisabled : styles.evolveButton}
                        variant='contained'
                      >
                        EVOLVE POKEMON
                      </Button>
                      
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