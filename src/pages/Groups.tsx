import { GroupContent } from "@/features/groups";
import PageShell from "@/shared/components/PageShell";

export default function Groups() {
  return <PageShell title="Групи" children={<GroupContent/>} />;
}
