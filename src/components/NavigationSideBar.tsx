import { PanelLeftClose } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import clsx from "clsx";
import logo from "../assets/logoSvg.svg";
import { NAV_ITEMS } from "../constants/navigation";

type NavigationSideBarProps = {
  open: boolean;
  isDesktop: boolean;
  onClose: () => void;
  onToggle: () => void;
};

export default function NavigationSideBar({
  open,
  isDesktop,
  onClose,
  onToggle,
}: NavigationSideBarProps) {
  const { pathname } = useLocation();
  const collapsed = isDesktop && !open;
  const isHome = pathname === "/home";

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 z-40 flex h-screen flex-col   bg-(--white) border-r border-(--border-soft) transition-all duration-400 ",
        "ease-in-out ",
        isDesktop
          ? open
            ? "w-64"
            : "w-20"
          : open
            ? "w-64 translate-x-0"
            : "pointer-events-none w-64 -translate-x-full",
      )}
    >
      <div
        className={clsx(
          "flex h-16 shrink-0 items-center ",
          collapsed ? "justify-center px-2" : "justify-between gap-2 px-4",
        )}
      >
        {collapsed ? (
          <button
            type="button"
            onClick={onToggle}
            aria-label="Розгорнути меню"
            className="rounded-xl p-1 transition-colors hover:bg-(--hover-nav-bg)"
          >
            <img src={logo} alt="Kata Team" className="h-10 w-10 rounded-full" />
          </button>
        ) : (
          <Link
            to="/home"
            replace={isHome}
            onClick={(event) => {
              if (isHome) {
                event.preventDefault();
              }
            }}
            className="flex min-w-0 items-center gap-2.5"
          >
            <img
              src={logo}
              alt="Kata Team"
              className="h-10 w-10 shrink-0 rounded-full"
            />
            <span
              className="truncate text-sm font-bold tracking-wide text-(--black) uppercase"
              style={{ fontFamily: "var(--font-family-header)" }}
            >
              Kata Team
            </span>
          </Link>
        )}

        {isDesktop && !collapsed && (
          <button
            type="button"
            aria-label="Згорнути меню"
            onClick={onToggle}
            className="rounded-lg p-2 text-(--dark-grey) transition-colors hover:bg-(--hover-nav-bg) hover:text-(--black)"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        )}
      </div>

      <nav
        className={clsx(
          "flex-1 overflow-y-auto py-4",
          collapsed ? "px-2" : "px-3",
        )}
      >
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <NavLink
                  to={item.path}
                  onClick={onClose}
                  title={collapsed ? item.name : undefined}
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center rounded-xl transition-colors duration-200 ",
                      collapsed
                        ? "justify-center px-2 py-3"
                        : "gap-3 px-3 py-2.5",
                      isActive
                        ? "bg-(--active-nav-bg) text-(--red)"
                        : "text-(--black) hover:bg-(--hover-nav-bg)",
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={clsx(
                          "h-5 w-5 shrink-0 transition-colors",
                          isActive ? "text-(--red)" : "text-(--dark-grey)",
                        )}
                        strokeWidth={isActive ? 2.25 : 1.75}
                      />
                      {!collapsed && (
                        <span
                          className={clsx(
                            "text-sm transition-colors",
                            isActive ? "font-bold" : "",
                          )}
                          style={{ fontFamily: "var(--font-family-main)" }}
                        >
                          {item.name}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
