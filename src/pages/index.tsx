import styles from '../styles/pages/Home.module.css';

import Head from 'next/head';

import { ProgressBar } from '../components/ProgressBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/CountDown';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home - Stop a Bit</title>
      </Head>
      <ProgressBar />
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <CountDown />
        </div>
        <div>

        </div>
      </section>
    </ div>
  );
}
