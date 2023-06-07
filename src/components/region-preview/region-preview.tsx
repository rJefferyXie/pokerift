// Styling
import styles from './region-preview.module.scss';

// Constants
import { Regions, Region } from '../../constants/regions';
import ExportedImage from 'next-image-export-optimizer';

const RegionPreview = () => {
  return (
    <div className={styles.container}>
      <h2>Choose A Region!</h2>

      <div className={styles.regions}>
        {Regions.map((region: Region, idx) => {
          return (
            <button className={styles.region} key={idx}>
              <h2 className={styles.regionName}>{region.name}</h2>
              <p>{region.description}</p>

              <ExportedImage
                className={styles.wallpaper}
                layout="fill"
                src={region.image}
                alt={"An image of " + region.name}
              />

              {region.highlightedPokemon.map((pokemon, idx) => {
                return (
                  <ExportedImage
                    className={styles.pokemonImage}
                    layout='fixed'
                    key={idx}
                    width={64}
                    height={64}
                    alt={pokemon}
                    src={'images/pokemon/' + pokemon + ".png"}
                  />
                )
              })}
            </button>
          )
        })}
      </div>

    </div>
  );
}

export default RegionPreview;