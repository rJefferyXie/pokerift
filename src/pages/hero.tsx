// Styling
import styles from '../styles/hero.module.scss';

// React + Next
import { useEffect, useState } from 'react';
import ExportedImage from 'next-image-export-optimizer';
import { useRouter } from 'next/router';

// Components
import HeroTip from '@/components/ui-general/hero-tip/hero-tip';
import Alert from '@/components/ui-general/alert/alert';
import Home from '@/components/game/home/home';

// Animations
import { motion, AnimatePresence } from 'framer-motion';
import fadeDown from '../animations/fade-down';

// Constants
import { Severity } from '../constants/severity';
import { regions } from '../scripts/constants';

// MUI
import {
  Button
} from '@mui/material';

// MUI Icons
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import MailIcon from '@mui/icons-material/Mail'
 
// Scripts
import getPokedex from '../scripts/generatePokedex';

// Firebase
import { 
  auth,
  db
} from '../firebase/config';

// Database
import { child, ref, set, get } from 'firebase/database';

// Authentication
import { 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  AuthProvider
} from 'firebase/auth';


const Hero = () => {
  const router = useRouter();

  // show alert messages
  const [showAlert, setShowAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');

  // registering or logging in
  const [registering, setRegistering] = useState(true);

  // sign up state
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // log in state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // auth providers
  const GoogleProvider = new GoogleAuthProvider();
  const FacebookProvider = new FacebookAuthProvider();

  useEffect(() => {
    if (auth.currentUser) {
      router.push('/game');
      return;
    }

    const pokedex = localStorage.getItem('pokedex');
    if (pokedex) return;

    const dbRef = ref(db);
    get(child(dbRef, 'pokedex')).then((snapshot) => {
      if (snapshot.exists()) {
        localStorage.setItem('pokedex', JSON.stringify(snapshot.val()));        
      }
    });
  }, [router]);

  useEffect(() => {
    if (!alertContent) return;

    // Wait for alert content to change before showing alert
    setShowAlert(true);
  }, [alertContent]);

  useEffect(() => {
    if (showAlert) return;

    // Reset alert content when it is closed
    setAlertContent('');
  }, [showAlert]);

  const createWithEmail = () => {
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    .then((result) => {
      router.push('/game');
    })
    .catch((error) => {
      setAlertContent("Could not create account. " + error.message);
      setAlertSeverity(Severity.ERROR);
    });
  }

  const loginWithEmail = () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((result) => {
      console.log(result)
      router.push('/game');
    })
    .catch((error) => {
      setAlertContent("Could not log in. " + error.message);
      setAlertSeverity(Severity.ERROR);
    });
  }

  const loginWithOther = (provider: AuthProvider) => {
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result)
      router.push('/game');
    })
    .catch((error) => {
      setAlertContent("Could not log in. " + error.message);
      setAlertSeverity(Severity.ERROR);
    });
  }

  return (
    <div className={styles.container}>
      <ExportedImage
        className={styles.heroWallpaper}
        layout="fill"
        src={"images/wallpapers/hero.png"}
        alt={"A picture of Celebi."}>
      </ExportedImage>

      <Alert
        content={alertContent}
        severity={alertSeverity}
        showAlert={showAlert}
        position='bottom'
        action={() => console.log("hi")}
        callback={() => setShowAlert(false)}>
      </Alert>

      <div className={styles.mainRow}>
        <div className={styles.leftColumn}>
          <h1 className={styles.heroHeader}>PokéRift</h1>
          <p className={styles.heroText}>Welcome to PokéRift, a custom card/adventure game!</p>

          <HeroTip 
            content={"Features 7 different regions to explore!"}
            order={1}>
          </HeroTip>
          <HeroTip 
            content={"Includes over 700 unique pokémon to discover!"}
            order={2}>
          </HeroTip>
          <HeroTip 
            content={"Level up and customize your team with special abilities!"}
            order={3}>
          </HeroTip>

          <p className={styles.heroFooter}>Made by Jeffery Xie</p>
        </div>

        <div className={styles.rightColumn}>
          <AnimatePresence initial={false} mode="wait">
            {registering ?
              <motion.div 
                className={styles.signUpLogin}
                key="signUpModal" 
                initial="hidden" 
                animate="visible" 
                exit="exit"
                variants={fadeDown}>
                
                <h2 className={styles.heroHeader}>Create Account</h2>

                <label>Email</label>
                <input type="email" 
                  className={styles.accountInput} 
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRegisterEmail(event.target.value)} 
                  value={registerEmail}
                  placeholder="Email">
                </input>

                <label>Password</label>
                <input 
                  type="password" 
                  className={styles.accountInput} 
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRegisterPassword(event.target.value)} 
                  value={registerPassword}
                  placeholder="Password">
                </input>

                <p className={styles.signUpLoginTextButton}>
                  Already have an account? 
                  <span 
                    className={styles.signUpLoginText} 
                    tabIndex={0} 
                    onClick={(_: React.MouseEvent<HTMLSpanElement>) => setRegistering(false)}
                    >
                    Click Here To Log In
                  </span>
                </p>

                <Button variant="contained" className={`${styles.registerEmail} button`} onClick={() => createWithEmail()}>
                  <MailIcon></MailIcon>
                  <p className={styles.loginText}>Create Account With Email</p>
                </Button>

                <div className={styles.buttons}>
                  <p className={styles.orText}>or</p>
                  <div className={styles.row}>
                    <Button variant="contained" className={`${styles.google} button`} onClick={() => loginWithOther(GoogleProvider)}>
                      <GoogleIcon></GoogleIcon>
                      <p className={styles.loginText}>Continue with Google</p>
                    </Button>
                    <Button variant="contained" className={`${styles.facebook} button`} onClick={() => loginWithOther(FacebookProvider)}>
                      <FacebookIcon></FacebookIcon>
                      <p className={styles.loginText}>Continue with Facebook</p>
                    </Button>
                  </div>
                </div>
              </motion.div> 
              :
              <motion.div 
                className={styles.signUpLogin}
                key="loginModal" 
                initial="hidden" 
                animate="visible"
                exit="exit" 
                variants={fadeDown}>

                <h2 className={styles.heroHeader}>Log In</h2>

                <label>Email</label>
                <input type="email" 
                  className={styles.accountInput} 
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLoginEmail(event.target.value)} 
                  value={loginEmail}
                  placeholder="Email">
                </input>
                
                <label>Password</label>
                <input 
                  type="password" 
                  className={styles.accountInput} 
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLoginPassword(event.target.value)} 
                  value={loginPassword}
                  placeholder="Password">
                </input>

                <p className={styles.signUpLoginTextButton}>
                  Need an account? 
                  <span 
                    className={styles.signUpLoginText} 
                    tabIndex={0} 
                    onClick={(_: React.MouseEvent<HTMLSpanElement>) => setRegistering(true)}
                    >
                    Click Here To Sign Up
                  </span>
                </p>              

                <Button variant="contained" className={`${styles.loginEmail} button`} onClick={() => loginWithEmail()}>
                  <MailIcon></MailIcon>
                  <p className={styles.loginText}>Log In With Email</p>
                </Button>

                <div className={styles.buttons}>
                  <p className={styles.orText}>or</p>
                  <div className={styles.row}>
                    <Button variant="contained" className={`${styles.google} button`} onClick={() => loginWithOther(GoogleProvider)}>
                      <GoogleIcon></GoogleIcon>
                      <p className={styles.loginText}>Continue with Google</p>
                    </Button>
                    <Button variant="contained" className={`${styles.facebook} button`} onClick={() => loginWithOther(FacebookProvider)}>
                      <FacebookIcon></FacebookIcon>
                      <p className={styles.loginText}>Continue with Facebook</p>
                    </Button>
                  </div>
                </div>
              </motion.div>  
            }
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Hero;