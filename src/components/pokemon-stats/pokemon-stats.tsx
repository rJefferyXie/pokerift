// Styles
import styles from './pokemon-stats.module.scss';

// Interfaces
import Pokemon from '../../interfaces/Pokemon';

// Constants
import { StatStrings, TypeColorSchemes } from '../../constants/pokemon';

interface PokemonStatsProps {
  card: Pokemon
}

const PokemonStats = (props: React.PropsWithChildren<PokemonStatsProps>) => {
  const { card } = props;

  return (
    <div className={styles.container}>
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
  )
}

export default PokemonStats;