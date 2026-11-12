import { MainContent } from "@/features/main";
import PageShell from "@/shared/components/PageShell";

export default function Home() {
  return <PageShell title="Головна" children={<MainContent/>}/>;
}
