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
import { getAvatarColor } from "../../utils/avatar";
import { toISOdate } from "../../utils/dataFormatter";
import { MOBILE_SIZE, TABLET_SIZE } from "../../constants/mediaQuery";

type ProfileDraft = Partial<
  Omit<ProfileSportsmanData, "role"> & Omit<ProfileCoachData, "role">
> & {
  role?: ProfileSportsmanData["role"] | ProfileCoachData["role"];
};

export default function ProfileContent() {
  const isMobile = useMediaQuery(MOBILE_SIZE);
  const isTablet = useMediaQuery(TABLET_SIZE);

  const user = getStoredUser();
  const [userData, setUserData] = useState<
    ProfileSportsmanData | ProfileCoachData | null
  >(null);

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<ProfileDraft>({});

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.id || !user?.role) return;

      const data = await userService.getProfileData(user.id, user.role);
      setUserData(data);
      setDraft(data ?? {});
    };

    void loadProfile();
  }, [user?.id, user?.role]);

  const avatarLetter = GetAvatarLetter(
    userData?.name ?? "",
    userData?.surname ?? "",
  );
  const displayName = GetDisplayName(userData?.name, userData?.surname);
  const roleLabel = GetRoleLabel(userData?.role);

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
      birth_date: toISOdate(draft.birth_date),
      city: draft.city?.name?.trim() || undefined,
      club: draft.club?.name?.trim() || undefined,
      karate_level: draft.karate_level,
      position: draft.position,
      specialization: draft.specialization,
      status: draft.status,
    };

    console.log("Saving profile with payload:", payload);

    try {
      const updatedProfileData = await userService.updateProfile(payload);
      console.log("Profile updated successfully:", updatedProfileData);

      setStoredUser({
        id: String(updatedProfileData.id),
        name: updatedProfileData.name,
        surname: updatedProfileData.surname,
        role: updatedProfileData.role,
      });

      const updatedProfile = updatedProfileData as
        | ProfileSportsmanData
        | ProfileCoachData;
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
              <div
                className="flex h-28 w-28 items-center justify-center self-center rounded-full  ring-1 ring-[color:var(--light-green)]/20"
                style={{
                  backgroundColor: getAvatarColor(avatarLetter),
                }}
              >
                {avatarLetter ? (
                  <span className="text-4xl font-bold text-(--white)">
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
                    <h1 className="text-section-title text-(--black)">
                      {displayName}
                    </h1>
                    <p className=" text-small text-(--dark-grey)">
                      {roleLabel}
                    </p>
                  </div>

                  <button
                    type="button"
                    className={clsx(
                      "inline-flex w-full items-center justify-center",
                      "gap-2 self-center rounded-full border border-(--grey) border-2 px-4 py-2",
                      "text-button text-(--green) transition-colors hover:bg-(--avatar-bg) ",
                    )}
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
                  <dl className={ "flex flex-col divide-y divide-[color:var(--grey)]  py-2 "}>
                    <FieldRow label="Ім'я">
                      <input
                        className={clsx(
                          "w-full bg-transparent text-small-bold ",
                          "text-(--black) outline-none placeholder:font-normal",
                          "placeholder:text-[color:var(--dark-grey)]",
                        )}
                        value={draft.name ?? ""}
                        onChange={(event) =>
                          handleFieldChange("name", event.target.value)
                        }
                        placeholder="Ім'я"
                      />
                    </FieldRow>

                    <FieldRow label="Прізвище">
                      <input
                         className={clsx(
                          "w-full bg-transparent text-small-bold ",
                          "text-(--black) outline-none placeholder:font-normal",
                          "placeholder:text-[color:var(--dark-grey)]",
                        )}
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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-(--pink) px-5 py-2 text-button text-white transition-opacity hover:opacity-90"
              onClick={handleCancel}
            >
              <Undo2 className="h-4 w-4" />
              Скасувати
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-(--light-green) px-5 py-2 text-button text-white transition-opacity hover:opacity-90"
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
