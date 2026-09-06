
import clsx from "clsx";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../../auth/hooks/useAuth";
import { groupService } from "../../services/groups.services";
import type {
  GroupMember,
  GroupMembersRequest,
} from "../../types/groups.types";
import GroupMemberRow from "../GroupMemberRow";

type GroupMembersTabProps = {
  groupId: number;
};

export default function GroupMembersTab({ groupId }: GroupMembersTabProps) {
  const [members, setMembers] = useState<GroupMember[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const loadGroupMembers = async () => {
      const userData: GroupMembersRequest = { userId: user.id, groupId };
      const data = await groupService.getGroupMembers(userData);
      setMembers(data);
    };
    void loadGroupMembers();
  }, [groupId, user?.id]);

  return (
    <div
      className={clsx(
        "",
      )}
    >
      <div className="flex flex-col gap-4">
        {members.length === 0 ? (
          <div className="flex items-center justify-center py-6">
            <span className="text-small text-(--dark-grey)">
              У групі поки немає учасників
            </span>
          </div>
        ) : (
          members.map((member) => {
            
            return (
             <GroupMemberRow key={member.id} member={member} />
            );
          })
        )}
      </div>
    </div>
  );
}
