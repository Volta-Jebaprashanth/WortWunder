import { useEffect, useState } from "react";
import type { MotherTongue } from "@/lib/i18n";

// The learner's profile, kept in localStorage. Shared by every route: the
// mother tongue decides which language all instructions and meanings use.
export const PROFILE_KEY = "wortwunder:profile";
export type Profile = { name: string; age: string; motherTongue: MotherTongue };

export function readProfile(): Profile | null {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Profile>;
    return {
      name: parsed.name ?? "",
      age: parsed.age ?? "",
      motherTongue: parsed.motherTongue ?? "english",
    };
  } catch {
    /* localStorage unavailable — treat as no saved profile */
    return null;
  }
}

export function writeProfile(profile: Profile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    /* localStorage unavailable — profile still works for this session */
  }
}

// The saved profile, read after mount (the server render can't see
// localStorage). `checked` turns true once that read has happened, so a
// screen can tell "no profile" apart from "not looked yet".
export function useProfile(): { profile: Profile | null; checked: boolean } {
  const [state, setState] = useState<{ profile: Profile | null; checked: boolean }>({
    profile: null,
    checked: false,
  });
  useEffect(() => setState({ profile: readProfile(), checked: true }), []);
  return state;
}
