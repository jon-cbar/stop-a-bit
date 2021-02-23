import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges() {
    return (
        <div className={styles.completedChallenges}>
            <span>Completed Challenges</span>
            <span>5</span>
        </div>
    );
}