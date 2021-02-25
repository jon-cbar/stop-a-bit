import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { TimerContext } from '../contexts/TimerContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const { restartTimer } = useContext(TimerContext);

    function handleChallengeCompleted() {
        completeChallenge();
        restartTimer();
    }

    function handleChallengeFailed() {
        resetChallenge();
        restartTimer();
    }

    return (
        <div className={styles.challengeBox}>
            {
                activeChallenge ? (
                    <div className={styles.activatedChallenge}>
                        <header>Win {activeChallenge.award} points</header>
                        <main>
                            <img
                                src={`icons/${activeChallenge.type}.svg`}
                                alt={activeChallenge.type} />
                            <strong>New challenge</strong>
                            <p>{activeChallenge.description}</p>
                        </main>
                        <footer>
                            <button type="button"
                                className={styles.failButton}
                                onClick={handleChallengeFailed}>
                                Failed
                            </button>
                            <button type="button"
                                className={styles.successButton}
                                onClick={handleChallengeCompleted}>
                                Completed
                            </button>
                        </footer>
                    </div>
                ) : (
                        <div className={styles.inactiveChallenge}>
                            <strong>Wait for the timer to receive challenges</strong>
                            <p>
                                <img src='icons/level-up.svg' alt='Level Up' />
                                <span>Complete challenges to level up.</span>
                            </p>
                        </div>
                    )
            }
        </div >
    );
}