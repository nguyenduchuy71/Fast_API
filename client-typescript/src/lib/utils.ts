import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment";

export const formatDateTime = (value: any) => {
  return moment(value).format("MMMM Do YYYY, hh:mm:ss");
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
