import styles from '../styles/components/Profile.module.css';

export function Profile() {
    return (
        <div className={styles.profile}>
            <img src="https://www.github.com/jon-cbar.png" alt="Jon Barroso" />
            <div>
                <strong>Jon Barroso</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level 1
                </p>
            </div>
        </div>
    );
}