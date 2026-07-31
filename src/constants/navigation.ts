import {
  Home,
  Calendar,
  Users,
  PersonStanding,
  ChartColumn,
  MessageSquare,
  User,
  Settings,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  id: string;
  name: string;
  icon: LucideIcon;
  path: string;
};

export const NAV_ITEMS: NavItem[] = [
  {
    id: "main",
    name: "Головна",
    icon: Home,
    path: "/home",
  },
  {
    id: "plans",
    name: "Плани",
    icon: Calendar,
    path: "/plans",
  },
  {
    id: "groups",
    name: "Групи",
    icon: Users,
    path: "/groups",
  },
  {
    id: "sportsmens",
    name: "Спортсмени",
    icon: PersonStanding,
    path: "/sportsmens",
  },
  {
    id: "statistics",
    name: "Статистика",
    icon: ChartColumn,
    path: "/statistics",
  },
  {
    id: "messages",
    name: "Повідомлення",
    icon: MessageSquare,
    path: "/messages",
  },
  {
    id: "profile",
    name: "Профіль",
    icon: User,
    path: "/profile",
  },
  {
    id: "settings",
    name: "Налаштування",
    icon: Settings,
    path: "/settings",
  },
];

export function getNavTitle(pathname: string): string {
  const item = NAV_ITEMS.find(
    (nav) => pathname === nav.path || pathname.startsWith(`${nav.path}/`),
  );
  return item?.name ?? "Головна";
}
