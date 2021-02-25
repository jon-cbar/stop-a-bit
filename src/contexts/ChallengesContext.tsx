import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    award: number;
}

interface ChallengesContextData {
    level: number;
    currentProgress: number;
    completedChallenges: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentProgress, setCurrentProgress] = useState(0);
    const [completedChallenges, setCompletedChallenges] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    // to execute useEffect block only once
    // we can use '[]' in parameters
    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);
        if (Notification.permission === 'granted') {
            new Notification('New challenge coming 🎉', {
                body: `Win ${challenge.award} points!`
            })
        }
        new Audio('/notification.mp3').play();
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }
        const { award } = activeChallenge;
        let newProgress = currentProgress + award;
        if (newProgress >= experienceToNextLevel) {
            levelUp();
            newProgress = newProgress - experienceToNextLevel;
        }
        setCurrentProgress(newProgress);
        resetChallenge();
        setCompletedChallenges(completedChallenges + 1);
    }

    return (
        <ChallengesContext.Provider value={{
            level, currentProgress,
            completedChallenges, experienceToNextLevel,
            activeChallenge,
            startNewChallenge, resetChallenge,
            levelUp, completeChallenge,
        }}>
            {children}
        </ChallengesContext.Provider>
    );
}