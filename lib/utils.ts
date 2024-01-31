import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import stc from "string-to-color";

export const stringToColor = (str: string) => {
  return stc(str);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
