import { format, formatDistance, differenceInDays } from "date-fns";

export const formatWeddingDate = (date: string): string =>
  format(new Date(date), "dd MMMM yyyy");

export const formatEventDate = (date: string): string =>
  format(new Date(date), "EEEE, dd MMMM yyyy");

export const formatEventTime = (time: string): string => {
  const [hours, minutes] = time.split(":");
  const h = parseInt(hours);
  const ampm = h >= 12 ? "PM" : "AM";
  const displayH = h % 12 || 12;
  return `${displayH}:${minutes} ${ampm}`;
};

export const daysUntilWedding = (date: string): number =>
  differenceInDays(new Date(date), new Date());

export const timeUntilWedding = (date: string) => {
  const target = new Date(date);
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
};
