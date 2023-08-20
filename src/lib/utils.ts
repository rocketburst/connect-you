import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const capitalize = (input: string) =>
  input.charAt(0).toUpperCase() + input.slice(1)

export const getInitials = (input: string) =>
  input
    .split(" ")
    .map((word) => word[0].toUpperCase())
    .join("")
