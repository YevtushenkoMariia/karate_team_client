import { useEffect, useState } from "react";
import type {
  ProfileCoachData,
  ProfileLocation,
  ProfileSportsmanData,
} from "../types/profile.types";
import { KarateLevel } from "../../../shared/types/karate_level";
import { karateLevelConvertor } from "../../../shared/utils/sportsmen";
import { getCities, getClubs } from "../../../api/locations";
import {
  STATUS_OPTIONS,
  FALLBACK_CLUBS,
  FALLBACK_CITIES,
} from "../../../constants/profile";
import type { LocationOption } from "../types/locations.type";
import { userFormatter } from "../../../shared/utils/profile";
import { normalizeOptions } from "../../../shared/utils/locations";
import FieldRow from "./FieldRow";

type ProfileDraft = Partial<
  Omit<ProfileSportsmanData, "role"> & Omit<ProfileCoachData, "role">
> & {
  role?: ProfileSportsmanData["role"] | ProfileCoachData["role"];
};

type ProfileEditFormProps = {
  draft: ProfileDraft;
  role: ProfileSportsmanData["role"] | ProfileCoachData["role"] | undefined;
  onFieldChange: (
    field: string,
    value: string | ProfileLocation | null,
  ) => void;
};

const KARATE_LEVEL_OPTIONS = Object.values(KarateLevel);

const fieldControlClassName =
  " w-full bg-transparent text-small-bold text-(--black) outline-none placeholder:text-[color:var(--dark-grey)]";

export default function ProfileEditForm({
  draft,
  role,
  onFieldChange,
}: ProfileEditFormProps) {
  const [cities, setCities] = useState<LocationOption[]>(FALLBACK_CITIES);
  const [clubs, setClubs] = useState<LocationOption[]>(FALLBACK_CLUBS);
  // add list of coaches
  // const [coaches, setCoach] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const citiesResponse = await getCities();
        const clubsResponse = await getClubs();

        setCities(normalizeOptions(citiesResponse));
        setClubs(normalizeOptions(clubsResponse));
      } catch (error) {
        console.error("Failed to fetch location options", error);
      }
    };

    void fetchLocations();
  }, []);

  const handleLocationChange = (
    field: "city" | "club",
    value: string,
    id: string | number | null,
  ) => {
    onFieldChange(field, {
      id: id ?? "",
      name: value,
    });
  };

  const listClassName =
    "flex h-full flex-col divide-y divide-[color:var(--grey)] rounded-[20px] bg-(--white) px-8 py-6 shadow-md";

  return (
    <>
      <dl className={listClassName}>
        <FieldRow label="Електронна пошта">
          <input
            className={  "mt-1 w-full bg-transparent text-sm font-semibold text-(--black) outline-none placeholder:font-normal placeholder:text-[color:var(--dark-grey)]"}
            value={draft.email ?? ""}
            onChange={(event) => onFieldChange("email", event.target.value)}
            placeholder="Електронна пошта"
          />
        </FieldRow>

        <FieldRow label="Номер телефону">
          <input
            className={  "mt-1 w-full bg-transparent text-sm font-semibold text-(--black) outline-none placeholder:font-normal placeholder:text-[color:var(--dark-grey)]"}
            value={draft.phone_number ?? ""}
            onChange={(event) =>
              onFieldChange("phone_number", event.target.value)
            }
            placeholder="Номер телефону"
          />
        </FieldRow>
        <FieldRow label="Дата народження">
          <input
            className={fieldControlClassName}
            value={draft.birth_date ?? ""}
            onChange={(event) =>
              onFieldChange("birth_date", event.target.value)
            }
            placeholder="Дата народження"
          />
        </FieldRow>
        <FieldRow label="Місто">
          <input
            className={fieldControlClassName}
            value={draft.city?.name ?? ""}
            onChange={(event) => {
              const value = event.target.value;
              const matchedOption = cities.find((item) => item.name === value);
              handleLocationChange(
                "city",
                value,
                matchedOption?.id ? String(matchedOption.id) : null,
              );
            }}
            placeholder="Місто"
            list="city-options"
          />
          <datalist id="city-options">
            {cities.map((city) => (
              <option key={city.id ?? city.name} value={city.name} />
            ))}
          </datalist>
        </FieldRow>
      </dl>

      {role === "SPORTSMAN" ? (
        <dl className={listClassName}>
          <FieldRow label="Рівень">
            <select
              className={fieldControlClassName}
              value={draft.karate_level ?? ""}
              onChange={(event) =>
                onFieldChange("karate_level", event.target.value)
              }
            >
              <option value="">Оберіть рівень</option>
              {KARATE_LEVEL_OPTIONS.map((level) => (
                <option key={level} value={level}>
                  {karateLevelConvertor(level)}
                </option>
              ))}
            </select>
          </FieldRow>
          <FieldRow label="Клуб">
            <input
              className={fieldControlClassName}
              value={draft.club?.name ?? ""}
              onChange={(event) => {
                const value = event.target.value;
                const matchedOption = clubs.find((item) => item.name === value);
                handleLocationChange(
                  "club",
                  value,
                  matchedOption?.id ? String(matchedOption.id) : null,
                );
              }}
              placeholder="Клуб"
              list="club-options"
            />
            <datalist id="club-options">
              {clubs.map((club) => (
                <option key={club.id ?? club.name} value={club.name} />
              ))}
            </datalist>
          </FieldRow>
          <FieldRow label="Статус">
            <select
              className={fieldControlClassName}
              value={draft.status ?? ""}
              onChange={(event) => onFieldChange("status", event.target.value)}
            >
              <option value="">Оберіть статус</option>
              {STATUS_OPTIONS.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </FieldRow>
          <FieldRow label="Тренер">
            <input
              className={fieldControlClassName}
              value={
                draft.coach
                  ? userFormatter.GetDisplayName(draft.coach.name, draft.coach.surname)
                  : ""
              }
              placeholder="Тренер"
              disabled
            />
          </FieldRow>
        </dl>
      ) : role === "COACH" ? (
        <dl className={listClassName}>
          <FieldRow label="Рівень">
            <select
              className={fieldControlClassName}
              value={draft.karate_level ?? ""}
              onChange={(event) =>
                onFieldChange("karate_level", event.target.value)
              }
            >
              <option value="">Оберіть рівень</option>
              {KARATE_LEVEL_OPTIONS.map((level) => (
                <option key={level} value={level}>
                  {karateLevelConvertor(level)}
                </option>
              ))}
            </select>
          </FieldRow>
          <FieldRow label="Клуб">
            <input
              className={fieldControlClassName}
              value={draft.club?.name ?? ""}
              onChange={(event) => {
                const value = event.target.value;
                const matchedOption = clubs.find((item) => item.name === value);
                handleLocationChange(
                  "club",
                  value,
                  matchedOption?.id ? String(matchedOption.id) : null,
                );
              }}
              placeholder="Клуб"
              list="club-options"
            />
            <datalist id="club-options">
              {clubs.map((club) => (
                <option key={club.id ?? club.name} value={club.name} />
              ))}
            </datalist>
          </FieldRow>

          <FieldRow label="Посада">
            <input
              className={fieldControlClassName}
              value={draft.position ?? ""}
              onChange={(event) =>
                onFieldChange("position", event.target.value)
              }
              placeholder="Посада"
            />
          </FieldRow>

          <FieldRow label="Спеціалізація">
            <input
              className={fieldControlClassName}
              value={draft.specialization ?? ""}
              onChange={(event) =>
                onFieldChange("specialization", event.target.value)
              }
              placeholder="Спеціалізація"
            />
          </FieldRow>
        </dl>
      ) : null}
    </>
  );
}
