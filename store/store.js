import { atom } from "jotai";

export const favouritesAtom = atom();
export const searchHistoryAtom = atom();
export const userAtom = atom(null); // Initialize with null for unauthenticated state