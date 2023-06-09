// React + Next
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// Firebase
import { 
  auth
} from '../firebase/config';


const Home = () => {
  const router = useRouter();

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