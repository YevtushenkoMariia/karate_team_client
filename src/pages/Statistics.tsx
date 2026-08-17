import PageShell from "../components/PageShell";
import StatisticContent from "../components/statistic/StatisticContent";

export default function Statistics() {
  return <PageShell title="Статистика" children={<StatisticContent />} />;
}
