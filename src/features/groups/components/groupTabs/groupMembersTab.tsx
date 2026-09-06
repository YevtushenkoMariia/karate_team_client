

type GroupMembersTabProps = {
  groupId: number;
};

export default function GroupMembersTab({ groupId }: GroupMembersTabProps) {
  return (
    <div className="rounded-[20px] border-4 border-dashed border-(--light-green) bg-(--white) px-4 py-16">
      <p className="text-center font-family-desc text-sm text-(--dark-grey)">
        Список учасників з’явиться пізніше (groupId: {groupId})
      </p>
    </div>
  );
}
