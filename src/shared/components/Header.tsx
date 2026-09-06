import { Bell, Menu, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logoSvg.svg";
import { GetAvatarLetter, GetDisplayName } from "../utils/profile";
import { getAvatarColor } from "../utils/avatar";
import { useAuth } from "../../features/auth/hooks/useAuth";

type HeaderProps = {
  onMenuClick?: () => void;
  showMenuButton?: boolean;
};

export default function Header({
  onMenuClick,
  showMenuButton = false,
}: HeaderProps) {
   const navigate = useNavigate();
  const { user } = useAuth();

  const displayName = GetDisplayName(user?.name, user?.surname);

  const avatarLetter = GetAvatarLetter(
    user?.name ?? "",
    user?.surname ?? "",
  );

  const handleGoToProfile = () => navigate("/profile");
  const handleGoHome = () => navigate("/home");

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-(--border-soft) bg-(--white) px-4 sm:px-6">
      <div className="flex items-center gap-2">
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
          onClick={handleGoHome}
          className="flex items-center gap-2.5 lg:hidden"
        >
          <img src={logo} alt="Kata Team" className="h-8 w-8 rounded-full" />
          <span
            className="text-section-body font-bold text-(--black) uppercase"
            style={{ fontFamily: "var(--font-family-header)" }}
          >
            Kata Team
          </span>
        </button>
      </div>

      <div className="flex items-center">
        <button
          type="button"
          onClick={handleGoToProfile}
          className="flex items-center gap-3 rounded-xl py-2 px-4 transition-colors hover:bg-(--hover-nav-bg)"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full  
            text-sm font-bold text-(--white)"
            style={{ fontFamily: "var(--font-family-header)", 
              backgroundColor: getAvatarColor(avatarLetter), }}
             
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

        <button
          type="button"
          aria-label="Сповіщення"
          className="rounded-lg p-3 text-(--dark-grey) transition-colors hover:bg-(--hover-nav-bg) hover:text-(--black)"
        >
          <Bell className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Settings"
          className="rounded-lg p-3 text-(--dark-grey) transition-colors hover:bg-(--hover-nav-bg) hover:text-(--black)"
        >
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
