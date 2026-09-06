import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { getNavTitle } from "../constants/navigation";

type PageShellProps = {
  title?: string;
  children?: ReactNode;
};

export default function PageShell({ title, children }: PageShellProps) {
  const { pathname } = useLocation();
  const pageTitle = title ?? getNavTitle(pathname);

  return (
    <div>
      <h1
        className="text-page-title"
        style={{ fontFamily: "var(--font-family-header)" }}
      >
        {pageTitle}
      </h1>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
