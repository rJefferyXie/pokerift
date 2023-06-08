// Styles
import styles from './pokemon-types.module.scss';

// Interfaces
import Pokemon from '../../interfaces/Pokemon';

// Constants
import { TypeColorSchemes } from '../../constants/pokemon';

interface PokemonTypesProps {
  card: Pokemon
}

const PokemonTypes = (props: React.PropsWithChildren<PokemonTypesProps>) => {
  const { card } = props;

  return (
    <div className={styles.container}>
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
  )
}

export default PokemonTypes;