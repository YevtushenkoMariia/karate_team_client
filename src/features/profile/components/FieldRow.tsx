import type { ReactNode } from "react";

export default function FieldRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="py-2 first:pt-0">
      <dt className="text-label text-[color:var(--dark-grey)]">{label}</dt>
      <dd className="">{children}</dd>
    </div>
  );
}