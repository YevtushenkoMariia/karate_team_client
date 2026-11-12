import PageShell from "@/shared/components/PageShell";
import { ProfileContent } from "@/features/profile";

export default function Profile() {
  return <PageShell title="Профіль" children={<ProfileContent />} />;
}
