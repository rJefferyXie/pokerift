// Styling
import styles from './navbar.module.scss';

// React + Next
import { useState } from 'react';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = () => {
  const [selected, setSelected] = useState('Home');

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>PokéRift</h1>

      <button 
        className={`${styles.navLink} ${selected === 'Home' ? styles.active : ''}`}
        onClick={() => setSelected('Home')}
      >
        <div className={styles.linkWrapper}>
          <HomeIcon className={styles.linkIcon}></HomeIcon>
          <p className={styles.linkText}>Home</p>
        </div>
      </button>

      <button 
        className={`${styles.navLink} ${selected === 'Inventory' ? styles.active : ''}`}
        onClick={() => setSelected('Inventory')}
      >
        <div className={styles.linkWrapper}>
          <ShoppingBasketIcon className={styles.linkIcon}></ShoppingBasketIcon>
          <p className={styles.linkText}>Inventory</p>
        </div>
      </button>

      <button 
        className={`${styles.navLink} ${selected === 'Pokeshop' ? styles.active : ''}`}
        onClick={() => setSelected('Pokeshop')}
      >
        <div className={styles.linkWrapper}>
          <ShoppingCartIcon className={styles.linkIcon}></ShoppingCartIcon>
          <p className={styles.linkText}>Pokéshop</p>
        </div>
      </button>

      <button 
        className={`${styles.navLink} ${selected === 'Statistics' ? styles.active : ''}`}
        onClick={() => setSelected('Statistics')}
      >
        <div className={styles.linkWrapper}>
          <AutoGraphIcon className={styles.linkIcon}></AutoGraphIcon>
          <p className={styles.linkText}>Statistics</p>
        </div>
      </button>

      <button 
        className={`${styles.navLink} ${selected === 'Settings' ? styles.active : ''}`}
        onClick={() => setSelected('Settings')}
      >
        <div className={styles.linkWrapper}>
          <SettingsIcon className={styles.linkIcon}></SettingsIcon>
          <p className={styles.linkText}>Settings</p>
        </div>
      </button>
    </div>
  );
}

export default Navbar;