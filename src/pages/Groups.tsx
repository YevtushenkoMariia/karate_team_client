import GroupContent from "../components/groups/GroupContent";
import PageShell from "../components/PageShell";

export default function Groups() {
  return <PageShell title="Групи" children={<GroupContent/>} />;
}
