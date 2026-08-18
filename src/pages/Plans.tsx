import PageShell from "../components/PageShell";
import PlansContent from "../components/plans/PlansContent";

export default function Plans() {
  return <PageShell title="Плани" children={<PlansContent/>}
   />;
}
