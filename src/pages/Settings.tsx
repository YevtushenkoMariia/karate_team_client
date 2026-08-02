import PageShell from "../components/PageShell";
import SettingsContent from "../components/settings/SettingsContent";


export default function Settings() {
  return <PageShell title="Налаштування" children={<SettingsContent />} />;
}
