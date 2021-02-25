import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface TimerContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean,
    startTimer: () => void;
    restartTimer: () => void;
}

interface TimerProviderProps {
    children: ReactNode;
}

export const TimerContext = createContext({} as TimerContextData);

let timerTimeout: NodeJS.Timeout;

export function TimerProvider({ children }: TimerProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const startTime = 0.05 * 60;
    const [time, setTime] = useState(startTime);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    function startTimer() {
        setIsActive(true);
    }

    function restartTimer() {
        clearTimeout(timerTimeout);
        setIsActive(false);
        setTime(startTime);
        setHasFinished(false);
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
        <TimerContext.Provider value={{
            minutes, seconds,
            isActive, hasFinished,
            restartTimer, startTimer,
        }}>
            {children}
        </TimerContext.Provider>
    )
}