import { AVATAR_COLORS } from "../constants/colors";

export class UserInfoFormatter {

  /**
   * 
   * @param name 
   * @param surname 
   * @returns 2 letter for the avatar 
   */
  public  GetAvatarLetter(name: string, surname: string) {
    if (
      (name == null && surname == null) ||
      (name == undefined && surname == undefined)
    ) {
      console.error("Both name and surname are null or undefined.");
      return "";
    }

    const letter = (name?.charAt(0) + surname?.charAt(0)).toUpperCase();

    return letter ?? "";
  }

  /**
   * 
   * @param name 
   * @param surname 
   * @returns Join name and surname 
   */
  public  GetDisplayName(
    name: string | undefined,
    surname: string | undefined,
  ) {
    if (name == null && surname == null) {
      console.error("Both name and surname are null or undefined.");
      return "Користувач";
    }

    return [name, surname].filter(Boolean).join(" ");
  }

  public  GetRoleLabel(role: string | undefined) {
    if (role == undefined) {
      console.error("Role is undefined.");
      return "Користувач";
    }

    const roleLabels = {
      SPORTSMAN: "Спортсмен",
      COACH: "Тренер",
      USER: "Користувач",
      ADMIN: "Адміністратор",
    };
    return roleLabels[role as keyof typeof roleLabels] ?? "Користувач";
  }

  public  getAvatarColor(name: string): string {
    const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);

    return AVATAR_COLORS[hash % AVATAR_COLORS.length];
  }
}


export const userFormatter = new UserInfoFormatter();