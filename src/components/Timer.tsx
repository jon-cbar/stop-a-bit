import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Timer.module.css';

let timerTimeout: NodeJS.Timeout;

export function Timer() {
    const { startNewChallenge } = useContext(ChallengesContext);

    const startTime = 0.05 * 60;
    const [time, setTime] = useState(startTime);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [leftMinute, rightMinute] = String(minutes).padStart(2, '0').split('');
    const [leftSecond, rightSecond] = String(seconds).padStart(2, '0').split('');

    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    function startTimer() {
        setIsActive(true);
    }

    function restartTimer() {
        clearTimeout(timerTimeout);
        setIsActive(false);
        setTime(startTime);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            timerTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time == 0) {
            setIsActive(false);
            setHasFinished(true);
            startNewChallenge();
        }
    }, [isActive, time]);

    return (
        <div>
            <div className={styles.timer}>
                <div>
                    <span>{leftMinute}</span>
                    <span>{rightMinute}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{leftSecond}</span>
                    <span>{rightSecond}</span>
                </div>
            </div>
            {
                hasFinished ? (
                    <button disabled
                        className={styles.timerButton}>
                        Done
                    </button>
                ) : (<>
                    {
                        isActive ? (
                            <button type="button"
                                className={`${styles.timerButton} ${styles.activeTimerButton}`}
                                onClick={restartTimer}>
                                Give Up
                            </button>
                        ) : (
                                <button type="button"
                                    className={styles.timerButton}
                                    onClick={startTimer}>
                                    Start
                                </button>
                            )
                    }
                </>)
            }
        </div>
    );
}