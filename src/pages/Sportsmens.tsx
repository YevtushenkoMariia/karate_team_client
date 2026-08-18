import PageShell from "../components/PageShell";
import SportsmensContent from "../components/sportsmens/SportsmensContent";

export default function Sportsmens() {
  return <PageShell title="Спортсмени" children={<SportsmensContent />} />;
}
