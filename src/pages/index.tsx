import styles from '../styles/pages/Home.module.css';

import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ProgressBar } from '../components/ProgressBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Timer } from '../components/Timer';
import { ChallengeBox } from '../components/ChallengeBox';

import { TimerProvider } from '../contexts/TimerContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  currentProgress: number;
  completedChallenges: number;
}

export default function Home(props) {
  return (
    <ChallengesProvider
      level={props.level}
      currentProgress={props.currentProgress}
      completedChallenges={props.completedChallenges}>
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
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentProgress, completedChallenges } = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currentProgress: Number(currentProgress),
      completedChallenges: Number(completedChallenges)
    }
  }
}