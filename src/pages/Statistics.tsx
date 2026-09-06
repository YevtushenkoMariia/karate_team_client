import PageShell from "../shared/components/PageShell";
import StatisticContent from "../features/statistic/components/StatisticContent";

export default function Statistics() {
  return <PageShell title="Статистика" children={<StatisticContent />} />;
}
