export function GetAvatarLetter(name: string | undefined, surname: string | undefined) {
  if (name == null && surname == null) {
    return "";
  }

  const letter = (name ?? surname)?.charAt(0)?.toUpperCase();

  return letter ?? "";
}


export function GetDisplayName(name: string | undefined, surname: string | undefined) {
    if(name == null && surname == null){
        return "Користувач";
    }

    return [name, surname].filter(Boolean).join(" ");
}

export function GetRoleLabel(role: string | undefined) {
if(role == undefined){
    return "Користувач";
}


   const roleLabels = 
   {
    SPORTSMAN: "Спортсмен",
    COACH: "Тренер",
    USER: "Користувач",
    ADMIN: "Адміністратор",
   }
   return roleLabels[role as keyof typeof roleLabels] ?? "Користувач";

}