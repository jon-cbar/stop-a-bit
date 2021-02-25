import styles from '../styles/pages/Home.module.css';

import Head from 'next/head';

import { ProgressBar } from '../components/ProgressBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Timer } from '../components/Timer';
import { ChallengeBox } from '../components/ChallengeBox';

import { TimerProvider } from '../contexts/TimerContext';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home - Stop a Bit</title>
      </Head>
      <ProgressBar />
      <TimerProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Timer />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </TimerProvider>
    </ div>
  );
}
