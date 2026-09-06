import type {LocationOption} from "../../features/profile/types/locations.type"

export function normalizeOptions(payload: unknown): LocationOption[] {
  if (Array.isArray(payload)) {
    return payload
      .filter(
        (item): item is Record<string, unknown> =>
          !!item && typeof item === "object",
      )
      .map((item) => ({
        id: String(item.id ?? item.value ?? item.name ?? ""),
        name: String(item.name ?? item.value ?? ""),
      }))
      .filter((item) => item.name);
  }

  if (payload && typeof payload === "object") {
    const data = (payload as Record<string, unknown>).data;

    if (Array.isArray(data)) {
      return normalizeOptions(data);
    }
  }

  return [];
}