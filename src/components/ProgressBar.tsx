import styles from '../styles/components/ProgressBar.module.css';

export function ProgressBar() {
    return (
        <div className={styles.progressBar}>
            <span>Zero 0</span>
            <div>
                <div style={{ width: '60%' }} />
                <span className={styles.currentProgress} style={{ left: '60%' }}>60%</span>
            </div>
            <span>\o/ Hero</span>
        </div>
    )
}