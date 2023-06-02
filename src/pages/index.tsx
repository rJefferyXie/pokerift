// React + Next
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Firebase
import { 
  db,
  auth
} from '../firebase/config';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import counterActions from '../store/actions/counterActions';
import { RootState } from '../store/reducers/rootReducer';

const Home = () => {
  const router = useRouter();
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
    if (auth.currentUser) {
      router.push('/game');
    } else {
      router.push('/hero');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>PokéRift - Login or Sign Up</title>
        <meta name="description" content="Pokémon game" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  )
}

export default Home;