import type { NextPage } from 'next';
import Head from 'next/head';
import { WeatherCard } from '../components/WeatherCard';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Localização & Clima</title>
      <meta name="description" content="Localização, Clima" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>
        Localização & Clima
      </h1>

      <WeatherCard />

    </main>
  </div>
);

export default Home;
