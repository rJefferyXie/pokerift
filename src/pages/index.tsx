import Head from 'next/head';
import styles from '../styles/home.module.scss';

import { useEffect, useState } from 'react';

import Hero from '../components/hero/hero';

// Firebase
import { 
  database as db,
  auth
} from '../firebase/config';

import { 
  ref, 
  set, 
  update, 
  push, 
  child, 
  onValue, 
  serverTimestamp 
} from "firebase/database";

// Redux
import { useSelector, useDispatch } from 'react-redux';
import counterActions from '../store/actions/counterActions';
import { RootState } from '../store/reducers/rootReducer';
import { KeyboardEventHandler } from 'react';

const Home = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counterReducer.counter);
  const [messages, setMessages] = useState([]);

  const increment = () => {
    dispatch(counterActions.increment());
  };

  const decrement = () => {
    dispatch(counterActions.decrement());
  };

  useEffect(() => {
    console.log(auth.currentUser);

    const getMessages = async () => {
      const messageRef = ref(db, "messages/");

      onValue(messageRef, (snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val(), typeof snapshot.val());

          setMessages(Object.values(snapshot.val()));
        }
      })
    }

    getMessages();
  }, []);



  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const newMessageKey = push(child(ref(db), 'messages/')).key;
      const updates: any = {};
      updates['/messages/' + newMessageKey] = {
        text: e.currentTarget.value,
        timestamp: serverTimestamp()
      }

      e.currentTarget.value = '';
      return update(ref(db), updates);
    }
  }

  return (
    <>
      <Head>
        <title>PokéRift - Login or Sign Up</title>
        <meta name="description" content="Pokémon game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero></Hero>
    </>
  )
}

export default Home;