import { useState, useEffect } from 'react';
import styles from '../styles/components/CountDown.module.css';

export function CountDown() {
    const startTime = 0.1;
    const [time, setTime] = useState(startTime * 60);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [leftMinute, rightMinute] = String(minutes).padStart(2, '0').split('');
    const [leftSecond, rightSecond] = String(seconds).padStart(2, '0').split('');

    const [active, setActive] = useState(false);

    function startCountDown() {
        setActive(true);
    }

    useEffect(() => {
        if (active && time > 0) {
            setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }
    }, [active, time]);

    return (
        <div>
            <div className={styles.countDown}>
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
            <button type="button"
                onClick={startCountDown}
                className={styles.startButton}>
                Start it
            </button>
        </div>
    );
}