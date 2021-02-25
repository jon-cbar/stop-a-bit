import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ProgressBar.module.css';

export function ProgressBar() {
    const { currentProgress, experienceToNextLevel } = useContext(ChallengesContext);

    const currentRate = Math.round(currentProgress * 100) / experienceToNextLevel;

    return (
        <div className={styles.progressBar}>
            <span>Zero (0)</span>
            <div>
                <div style={{ width: `${currentRate}%` }} />
                <span className={styles.currentProgress}
                    style={{ left: `${currentRate}%` }}>
                    {currentProgress}
                </span>
            </div>
            <span>Next Level ({experienceToNextLevel})</span>
        </div>
    )
}