import PageShell from "@/shared/components/PageShell";
import { PlansContent } from "@/features/plans";

export default function Plans() {
  return <PageShell title="Плани" children={<PlansContent/>}
   />;
}
