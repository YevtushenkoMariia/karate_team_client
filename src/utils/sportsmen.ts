
export function sportsmeStatusConvertor(status: string): string {
  switch (status) {
    case "JUST_TRAIN":
      return "Тренуюсь";
    case "RESERVE":
      return "Резерв збірної";
    case "NATIONAL_TEAM":
      return "Збірник";
    default:
      return "Невідомий статус";
  }
}

export function karateLevelConvertor(level: string): string {
  if (!level) return "—";

  const [rank, type] = level.split("_");

  if (!rank || !type) return level;

  const normalizedRank = rank.replace(/^0+/, "");
  const normalizedType = type === "KYU" ? "Kyu" : type === "DAN" ? "Dan" : type;

  return `${normalizedRank} ${normalizedType}`;
}
