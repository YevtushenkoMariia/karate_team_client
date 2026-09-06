

type GroupPlansTabProps = {
  groupId: number;
};

export default function GroupPlansTab({ groupId }: GroupPlansTabProps) {
  return (
    <div className="rounded-[20px] border-4 border-dashed border-(--light-green) bg-(--white) px-4 py-16">
      <p className="text-center font-family-desc text-sm text-(--dark-grey)">
        Плани для цієї групи з’являться пізніше (groupId: {groupId})
      </p>
    </div>
  );
}
