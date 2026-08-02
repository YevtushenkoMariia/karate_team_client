type ProfileInfoItem = {
  label: string;
  value: string;
};

type ProfileInfoListProps = {
  items: ProfileInfoItem[];
};

export default function ProfileInfoList({ items }: ProfileInfoListProps) {
  return (
    <dl className="flex h-full flex-col divide-y divide-[color:var(--grey)] rounded-[20px] bg-(--white) px-8 py-6 shadow-md">
      {items.map((item) => (
        <div key={item.label} className="py-2 first:pt-0">
          <dt className="text-xs text-[color:var(--dark-grey)]">{item.label}</dt>
          <dd className="mt-1 text-sm font-semibold text-[color:var(--black)]">
            {item.value?.name ?? item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
