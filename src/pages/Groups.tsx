import GroupContent from "../features/groups/components/GroupContent";
import PageShell from "../shared/components/PageShell";

export default function Groups() {
  return <PageShell title="Групи" children={<GroupContent/>} />;
}
