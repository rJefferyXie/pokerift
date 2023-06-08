// Styles
import styles from './pokemon-level.module.scss';

// Interfaces
import Pokemon from '../../interfaces/Pokemon';

interface PokemonLevelProps {
  card: Pokemon
}

const PokemonLevel = (props: React.PropsWithChildren<PokemonLevelProps>) => {
  const { card } = props;

  return (
    <div className={styles.container}>
      {/* Pokemon can still evolve. */}
      {(card.evolutions?.length && !card.is_legendary && !card.is_mythical) &&
        <p className={styles.baby} style={{width: card.level / card.evolutions[0].minLevel * 100}}>
          {card.level + "/" + card.evolutions[0].minLevel}
        </p>
      }

      {/* Pokemon is fully evolved. */}
      {(!card.evolutions?.length && !card.is_legendary && !card.is_mythical) 
        && <p className={styles.max}>MAX</p>}

      {card.is_mythical && <p className={styles.mythical}>MYTHICAL</p>}
      {card.is_legendary && <p className={styles.legendary}>LEGENDARY</p>}
    </div>
  )
}

export default PokemonLevel;