export function formatMembersCount(count: number): string {
  const abs = Math.abs(count);
  const mod10 = abs % 10;
  const mod100 = abs % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return `${count} учасник`;
  }

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${count} учасники`;
  }

  return `${count} учасників`;
}

export function toISOdate(date: string | undefined) {
  if (date == null || date == undefined) {
    return "";
  }

  const [day, month, year] = date.split(".");

  const isoDate = new Date(
    `${year}-${month}-${day}T00:00:00.000Z`,
  ).toISOString();

  return isoDate;
}
