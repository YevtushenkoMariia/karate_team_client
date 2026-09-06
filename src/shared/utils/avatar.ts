import { AVATAR_COLORS } from "../constants/colors";

export function getAvatarColor(name: string): string {
  const hash = [...name].reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0
  );

  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}