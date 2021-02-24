import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {
    const { activeChallenge, resetChallenge } = useContext(ChallengesContext);

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
                                onClick={resetChallenge}>
                                Failed
                            </button>
                            <button type="button"
                                className={styles.successButton}>
                                Completed
                            </button>
                        </footer>
                    </div>
                ) : (
                        <div className={styles.inactiveChallenge}>
                            <strong>Wait for the timer to receive challenges</strong>
                            <p>
                                <img src='icons/level-up.svg' alt='Level Up' />
                                Complete challenges to level up.
                            </p>
                        </div>
                    )
            }
        </div >
    );
}