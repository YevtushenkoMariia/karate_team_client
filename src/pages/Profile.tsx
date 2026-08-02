import PageShell from "../components/PageShell";
import ProfileContent from "../components/profile/ProfileContent";

export default function Profile() {
  return <PageShell title="Профіль" children={<ProfileContent />} />;
}
