import PageShell from "../shared/components/PageShell";
import SportsmensContent from "../features/sportsmens/components/SportsmensContent";

export default function Sportsmens() {
  return <PageShell title="Спортсмени" children={<SportsmensContent />} />;
}
