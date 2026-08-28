import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-md">
      <div className="mb-8 space-y-0">
        <h1
          className="text-page-title text-(--black)"
          style={{ fontFamily: "var(--font-family-header)" }}
        >
          {title}
        </h1>
        <p className="text-small text-(--dark-grey)">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
