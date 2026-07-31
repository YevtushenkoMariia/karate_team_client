import { Bell, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoSvg.svg";
import { USER_KEY } from "../constants/storage";

type StoredUser = {
  name?: string;
  surname?: string;
};

type HeaderProps = {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
};

function getStoredUser(): StoredUser {
  const raw = localStorage.getItem(USER_KEY);

  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return {};
  }
}

export default function Header({
  onMenuClick,
  showMenuButton = false,
}: HeaderProps) {
  const navigate = useNavigate();
  const user = getStoredUser();
  const firstName = user.name?.trim() || "";
  const lastName = user.surname?.trim() || "";
  const displayName =
    [firstName, lastName].filter(Boolean).join(" ") || "Користувач";
  const avatarLetter = (firstName || displayName).charAt(0).toUpperCase();

  const goToProfile = () => navigate("/profile");

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-(--border-soft) bg-(--white) px-4 sm:px-6">
      <div className="flex items-center gap-3">
        {showMenuButton && (
          <button
            type="button"
            aria-label="Відкрити меню"
            onClick={onMenuClick}
            className="rounded-lg p-2 text-(--black) transition-colors hover:bg-(--hover-nav-bg)"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}

        <button
          type="button"
          onClick={() => navigate("/home")}
          className="flex items-center gap-2.5 lg:hidden"
        >
          <img src={logo} alt="Kata Team" className="h-9 w-9 rounded-full" />
          <span
            className="text-sm font-bold tracking-wide text-(--black) uppercase"
            style={{ fontFamily: "var(--font-family-header)" }}
          >
            Kata Team
          </span>
        </button>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          aria-label="Сповіщення"
          className="rounded-lg p-2 text-(--dark-grey) transition-colors hover:bg-(--hover-nav-bg) hover:text-(--black)"
        >
          <Bell className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={goToProfile}
          className="flex items-center gap-3 rounded-xl py-1.5 pr-2 pl-1.5 transition-colors hover:bg-(--hover-nav-bg)"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full bg-(--avatar-bg) text-sm font-bold text-(--red)"
            style={{ fontFamily: "var(--font-family-header)" }}
          >
            {avatarLetter}
          </span>
          <span
            className="hidden text-sm font-semibold text-(--black) sm:inline"
            style={{ fontFamily: "var(--font-family-main)" }}
          >
            {displayName}
          </span>
        </button>
      </div>
    </header>
  );
}
