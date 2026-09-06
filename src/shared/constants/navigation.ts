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
import type { Role } from "../types/roles";

export type NavigationItem = {
  id: string;
  name: string;
  icon: LucideIcon;
  path: string;
  allowedRoles: Role[]; // Optional property for allowed roles
};

export const NAV_ITEMS: NavigationItem[] = [
  {
    id: "main",
    name: "Головна",
    icon: Home,
    path: "/home",
    allowedRoles: ["ADMIN", "COACH", "SPORTSMAN"], // Example of allowed roles for this item
  },
  {
    id: "plans",
    name: "Плани",
    icon: Calendar,
    path: "/plans",
    allowedRoles: ["ADMIN", "COACH", "SPORTSMAN"], // Example of allowed roles for this item
  },
  {
    id: "groups",
    name: "Групи",
    icon: Users,
    path: "/groups",
    allowedRoles: ["ADMIN", "COACH", "SPORTSMAN"], // Example of allowed roles for this item
  },
  {
    id: "sportsmens",
    name: "Спортсмени",
    icon: PersonStanding,
    path: "/sportsmens",
    allowedRoles: ["ADMIN", "COACH"], // Example of allowed roles for this item

  },
  {
    id: "statistics",
    name: "Статистика",
    icon: ChartColumn,
    path: "/statistics",
    allowedRoles: ["ADMIN", "COACH", "SPORTSMAN"], // Example of allowed roles for this item
  },
  {
    id: "messages",
    name: "Повідомлення",
    icon: MessageSquare,
    path: "/messages",
    allowedRoles: ["ADMIN", "COACH", "SPORTSMAN"], // Example of allowed roles for this item
  },
  {
    id: "profile",
    name: "Профіль",
    icon: User,
    path: "/profile",
    allowedRoles: ["ADMIN", "COACH", "SPORTSMAN"], // Example of allowed roles for this item
  },
  {
    id: "settings",
    name: "Налаштування",
    icon: Settings,
    path: "/settings",
    allowedRoles: ["ADMIN", "COACH", "SPORTSMAN"], // Example of allowed roles for this item
  },
];


