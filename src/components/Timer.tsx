import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { TimerContext } from '../contexts/TimerContext';
import styles from '../styles/components/Timer.module.css';

export function Timer() {

    const {
        minutes, seconds,
        hasFinished, isActive,
        startTimer, restartTimer
    } = useContext(TimerContext);

    const [leftMinute, rightMinute] = String(minutes).padStart(2, '0').split('');
    const [leftSecond, rightSecond] = String(seconds).padStart(2, '0').split('');

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