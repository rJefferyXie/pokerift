// Styles
import styles from './settings.module.scss';

// React + Next
import Router from 'next/router';

// Firebase
import { auth } from '../../../firebase/config';

// MUI
import { Button } from '@mui/material';

const Settings = () => {
  
  const logout = () => {
    auth.signOut();
    Router.push('/hero');
  }

  return (
    <div className={styles.container}>
      Coming Soon!

      <Button 
        className={styles.logoutButton}
        onClick={() => logout()}
      >
        Sign Out Of Your Account
      </Button>    
    </div>
  )
}

export default Settings;