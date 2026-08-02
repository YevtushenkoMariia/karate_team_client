import { Check, Pencil, Undo2, User } from "lucide-react";
import { userService } from "../../services/user";
import { getStoredUser, setStoredUser } from "../../constants/storage";
import { useEffect, useState } from "react";
import ProfileEditForm from "./ProfileEditForm";
import ProfileInfoList from "./ProfileInfoList";
import type {
  ProfileSportsmanData,
  ProfileCoachData,
  ProfileLocation,
  ProfileUpdateRequest,
} from "../../types/profile.types";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import clsx from "clsx";
import {
  karateLevelConvertor,
  sportsmeStatusConvertor,
} from "../../utils/sportsmen";
import {
  GetAvatarLetter,
  GetDisplayName,
  GetRoleLabel,
} from "../../utils/profile";
import FieldRow from "./FieldRow";

type ProfileDraft = Partial<
  Omit<ProfileSportsmanData, "role"> & Omit<ProfileCoachData, "role">
> & {
  role?: ProfileSportsmanData["role"] | ProfileCoachData["role"];
};

export default function ProfileContent() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");

  const user = getStoredUser();
  const [userData, setUserData] = useState<
    ProfileSportsmanData | ProfileCoachData | null
  >(null);

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<ProfileDraft>({});

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id || !user?.role) 
        return;

      const data = await userService.getProfileData(user.id, user.role);
      setUserData(data);
      setDraft(data ?? {});
    };

    void loadProfile();
  }, [user?.id, user?.role]);

  const avatarLetter = GetAvatarLetter(userData?.name, userData?.surname);
  const displayName = GetDisplayName(userData?.name, userData?.surname);
  const roleLabel = GetRoleLabel(userData?.role);

  const fieldControlClassName =
    "mt-1 w-full bg-transparent text-sm font-semibold text-(--black) outline-none placeholder:font-normal placeholder:text-[color:var(--dark-grey)]";

  const listClassName =
    "flex flex-col divide-y divide-[color:var(--grey)]  py-4 ";

  const coachDisplayName =
    userData?.role === "SPORTSMAN" && userData.coach
      ? GetDisplayName(userData.coach.name, userData.coach.surname)
      : "—";

  const generalInfoItems = [
    { label: "Електронна пошта", value: userData?.email ?? "—" },
    { label: "Номер телефону", value: userData?.phone_number ?? "—" },
    { label: "Дата народження", value: userData?.birth_date ?? "—" },
    { label: "Місто", value: userData?.city?.name ?? "—" },
  ];

  const roleSpecificItems =
    userData?.role === "SPORTSMAN"
      ? [
          { label: "Рівень", value: userData.karate_level ?? "—" },
          { label: "Клуб", value: userData.club?.name ?? "—" },
          {
            label: "Статус",
            value: sportsmeStatusConvertor(userData.status) ?? "—",
          },
          { label: "Тренер", value: coachDisplayName },
        ]
      : userData?.role === "COACH"
        ? [
            {
              label: "Рівень",
              value: karateLevelConvertor(userData.karate_level) ?? "—",
            },
            { label: "Клуб", value: userData.club?.name ?? "—" },
            { label: "Посада", value: userData.position ?? "—" },
            { label: "Спеціалізація", value: userData.specialization ?? "—" },
          ]
        : [];

  const handleFieldChange = (
    field: string,
    value: string | ProfileLocation | null,
  ) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setDraft(userData ?? {});
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!user?.id || !user?.role || !userData) return;

    const payload: ProfileUpdateRequest = {
      name: draft.name,
      surname: draft.surname,
      email: draft.email,
      gender: draft.gender,
      phone_number: draft.phone_number,
      birth_date: draft.birth_date,
      city: draft.city?.name?.trim() || undefined,
      club: draft.club?.name?.trim() || undefined,
      karate_level: draft.karate_level,
      position: draft.position,
      specialization: draft.specialization,
      status: draft.status,
    };

    console.log("Saving profile with payload:", payload);

    try {
      const result = await userService.updateProfile(payload);
      console.log("Profile updated successfully:", result);

      setStoredUser({
        id: String(result.id),
        name: result.name,
        surname: result.surname,
        role: result.role,
      });

      const updatedProfile = result as ProfileSportsmanData | ProfileCoachData;
      setUserData(updatedProfile);
      setDraft(updatedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  return (
    <>
      <div className="w-full overflow-hidden">
        <div
          className={clsx(
            "grid py-4 px-4",
            isMobile
              ? "grid-cols-1 gap-3"
              : isTablet
                ? "grid-cols-2 gap-4"
                : "grid-cols-3 gap-6",
          )}
        >
          {/* Card */}
          <div
            className={clsx(
              "flex flex-col rounded-[20px] border-4 border-(--light-green) bg-(--white) px-8 py-8 shadow-md",
              isTablet
                ? "col-span-2 flex-row items-center gap-8"
                : "col-span-1 gap-4",
            )}
          >
            <div className="flex flex-col items-center md:items-start">
              <div className="flex h-28 w-28 items-center justify-center self-center rounded-full bg-(--avatar-bg) ring-1 ring-[color:var(--light-green)]/20">
                {avatarLetter ? (
                  <span className="text-4xl font-bold text-(--light-green)">
                    {avatarLetter}
                  </span>
                ) : (
                  <User
                    className="h-16 w-16 text-(--light-green)"
                    strokeWidth={1.5}
                  />
                )}
              </div>
            </div>

            <div className="">
              {!isEditing ? (
                <>
                  <div className="text-center md:text-left mb-4">
                    <h1 className="text-xl font-bold text-(--black)">
                      {displayName}
                    </h1>
                    <p className="mt-1 text-sm text-(--dark-grey)">
                      {roleLabel}
                    </p>
                  </div>

                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 self-center rounded-full border border-(--grey) px-4 py-2 text-sm text-(--green) transition-colors hover:bg-(--avatar-bg) "
                    onClick={() => {
                      setDraft(userData ?? {});
                      setIsEditing(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                    Редагувати профіль
                  </button>
                </>
              ) : (
                <>
                  <dl className={listClassName}>
                    <FieldRow label="Ім'я">
                      <input
                        className={fieldControlClassName}
                        value={draft.name ?? ""}
                        onChange={(event) =>
                          handleFieldChange("name", event.target.value)
                        }
                        placeholder="Ім'я"
                      />
                    </FieldRow>

                    <FieldRow label="Прізвище">
                      <input
                        className={fieldControlClassName}
                        value={draft.surname ?? ""}
                        onChange={(event) =>
                          handleFieldChange("surname", event.target.value)
                        }
                        placeholder="Прізвище"
                      />
                    </FieldRow>
                  </dl>
                </>
              )}
            </div>
          </div>

          {/* Info list */}

          {isEditing ? (
            <ProfileEditForm
              draft={draft}
              role={userData?.role}
              onFieldChange={handleFieldChange}
            />
          ) : (
            <>
              <ProfileInfoList items={generalInfoItems} />

              <ProfileInfoList items={roleSpecificItems} />
            </>
          )}
        </div>

        {isEditing && (
          <div className="flex justify-end gap-3 px-4 pb-4">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-(--pink) px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              onClick={handleCancel}
            >
              <Undo2 className="h-4 w-4" />
              Скасувати
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-(--light-green) px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              onClick={() => {
                void handleSave();
              }}
            >
              <Check className="h-4 w-4" />
              Зберегти
            </button>
          </div>
        )}
      </div>
    </>
  );
}
