import type {LocationOption} from "../features/profile/types/locations.type"

export const STATUS_OPTIONS = [
  { value: "JUST_TRAIN", label: "Тренуюсь" },
  { value: "RESERVE", label: "Резерв збірної" },
  { value: "NATIONAL_TEAM", label: "Збірник" },
];


export const FALLBACK_CITIES: LocationOption[] = [
  { id: "kyiv", name: "Київ" },
  { id: "lviv", name: "Львів" },
];

export const FALLBACK_CLUBS: LocationOption[] = [
  { id: "club-1", name: "KARATE CLUB 1" },
  { id: "club-2", name: "KARATE CLUB 2" },
];