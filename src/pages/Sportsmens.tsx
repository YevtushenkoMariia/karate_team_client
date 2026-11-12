import PageShell from "@/shared/components/PageShell";
import { SportsmensContent } from "@/features/sportsmens";

export default function Sportsmens() {
  return <PageShell title="Спортсмени" children={<SportsmensContent />} />;
}
