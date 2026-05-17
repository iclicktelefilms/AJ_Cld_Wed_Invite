import { useState, useEffect } from "react";
import { timeUntilWedding } from "@/utils/formatDate";

export const useCountdown = (targetDate: string) => {
  const [timeLeft, setTimeLeft] = useState(timeUntilWedding(targetDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(timeUntilWedding(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
};
