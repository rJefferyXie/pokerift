import ExportedImage from 'next-image-export-optimizer';
import styles from './hero.module.scss';

import { useEffect, useState } from 'react';
import HeroTip from '../ui-general/hero-tip/hero-tip';

// Animations
import { motion, AnimatePresence } from 'framer-motion';
import fadeDown from '../../animations/fade-down';

import getPokedex from '../../scripts/generatePokedex';

import {
  Button
} from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import MailIcon from '@mui/icons-material/Mail'
 
// Firebase
import { 
  auth
} from '../../firebase/config';

import { 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';

const Hero = () => {
  // registering or logging in
  const [registering, setRegistering] = useState(true);

  // sign up state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // log in state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // auth providers
  const GoogleProvider = new GoogleAuthProvider();
  const FacebookProvider = new FacebookAuthProvider();

  useEffect(() => {
    getPokedex();
  })

  const loginWithEmail = () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      console.log(userCredential)
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  const loginWithGoogle = () => {
    signInWithPopup(auth, GoogleProvider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  const loginWithFacebook = () => {
    signInWithPopup(auth, FacebookProvider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
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

      <div className={styles.mainRow}>
        <div className={styles.leftColumn}>
          <h1 className={styles.heroHeader}>PokéRift</h1>
          <p className={styles.heroText}>Welcome to PokéRift, a custom card/adventure game!</p>

          <HeroTip 
            content={"Features 7 different regions to explore."}
            order={1}>
          </HeroTip>
          <HeroTip 
            content={"Includes over 700 unique pokémon to discover."}
            order={2}>
          </HeroTip>
          <HeroTip 
            content={"3 artwork styles for pokémon sprites to choose from."}
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
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} 
                  placeholder="Email">
                </input>

                <label>Password</label>
                <input 
                  type="password" 
                  className={styles.accountInput} 
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} 
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

                <Button variant="contained" className={`${styles.email} button`} onClick={() => loginWithEmail()}>
                  <MailIcon></MailIcon>
                  <p className={styles.loginText}>Create Account With Email</p>
                </Button>

                <div className={styles.buttons}>
                  <p className={styles.orText}>or</p>
                  <div className={styles.row}>
                    <Button variant="contained" className={`${styles.google} button`} onClick={() => loginWithGoogle()}>
                      <GoogleIcon></GoogleIcon>
                      <p className={styles.loginText}>Continue with Google</p>
                    </Button>
                    <Button variant="contained" className={`${styles.facebook} button`} onClick={() => loginWithFacebook()}>
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
                  placeholder="Email">
                </input>
                
                <label>Password</label>
                <input 
                  type="password" 
                  className={styles.accountInput} 
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLoginPassword(event.target.value)} 
                  placeholder="Password"
                ></input>

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

                <Button variant="contained" className={`${styles.email} button`} onClick={() => loginWithEmail()}>
                  <MailIcon></MailIcon>
                  <p className={styles.loginText}>Log In With Email</p>
                </Button>

                <div className={styles.buttons}>
                  <p className={styles.orText}>or</p>
                  <div className={styles.row}>
                    <Button variant="contained" className={`${styles.google} button`} onClick={() => loginWithGoogle()}>
                      <GoogleIcon></GoogleIcon>
                      <p className={styles.loginText}>Continue with Google</p>
                    </Button>
                    <Button variant="contained" className={`${styles.facebook} button`} onClick={() => loginWithFacebook()}>
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