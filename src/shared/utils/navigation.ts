
import { type Role } from "../types/roles";
import { type NavigationItem
 } from "../constants/navigation";

export function getNavItems(role: Role | undefined, navigationList: NavigationItem[]): NavigationItem[] {
if (navigationList.length === 0) {
    return [];
  }

  if (!role) {
    return [];
  }

   return navigationList.filter((item) => {
    if (!item.allowedRoles) {
      return true;
    }

    if (!role) {
      return false;
    }

    return item.allowedRoles.includes(role);
  });


}


export function getNavTitle(pathname: string, navigationList: NavigationItem[]): string {
  const item = navigationList.find(
    (nav) => pathname === nav.path || pathname.startsWith(`${nav.path}/`),
  );
  return item?.name ?? "Головна";
}