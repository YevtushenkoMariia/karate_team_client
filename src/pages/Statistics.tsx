import PageShell from "@/shared/components/PageShell";
import { StatisticContent } from "@/features/statistic";

export default function Statistics() {
  return <PageShell title="Статистика" children={<StatisticContent />} />;
}
