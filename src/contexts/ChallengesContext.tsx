import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

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
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode,
    level: number;
    currentProgress: number;
    completedChallenges: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
    children,
    ...rest
}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentProgress, setCurrentProgress] = useState(rest.currentProgress ?? 0);
    const [completedChallenges, setCompletedChallenges] = useState(rest.completedChallenges ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    // to execute useEffect block only once
    // we can use '[]' in parameters
    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentProgress', String(currentProgress));
        Cookies.set('completedChallenges', String(completedChallenges));
    }, [level, currentProgress, completedChallenges]);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
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
            activeChallenge, closeLevelUpModal,
            startNewChallenge, resetChallenge,
            levelUp, completeChallenge,
        }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    );
}