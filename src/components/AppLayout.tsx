import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "../hooks/useMediaQuery";
import Header from "./Header";
import NavigationSideBar from "./NavigationSideBar";
import { DESKTOP_SIZE } from "../constants/mediaQuery";

export default function AppLayout() {
  const isDesktop = useMediaQuery(DESKTOP_SIZE);
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarOpen = isDesktop ? desktopOpen : mobileOpen;

  const toggleSidebar = () => {
    if (isDesktop) {
      setDesktopOpen((open) => !open);
    } else {
      setMobileOpen((open) => !open);
    }
  };

  const closeSidebar = () => {
    if (!isDesktop) {
      setMobileOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-(--white)">
      <NavigationSideBar
        open={sidebarOpen}
        isDesktop={isDesktop}
        onClose={closeSidebar}
        onToggle={toggleSidebar}
      />

      {!isDesktop && sidebarOpen && (
        <button
          type="button"
          aria-label="Закрити меню"
          className="fixed inset-0 z-30 bg-(--black)/30 transition-opacity"
          onClick={closeSidebar}
        />
      )}

      <div
        className={`flex min-h-screen min-w-0 flex-1 flex-col transition-[margin] duration-300 ${
          isDesktop ? (sidebarOpen ? "ml-64" : "ml-20") : "ml-0"
        }`}
      >
        <Header
          onMenuClick={toggleSidebar}
          showMenuButton={!isDesktop}
        />

        <main className="flex-1 overflow-auto bg-(--white) px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
