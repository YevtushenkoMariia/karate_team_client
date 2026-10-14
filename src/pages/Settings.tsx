import PageShell from "@/shared/components/PageShell";
import { SettingsContent } from "@/features/settings";


export default function Settings() {
  return <PageShell title="Налаштування" children={<SettingsContent />} />;
}
