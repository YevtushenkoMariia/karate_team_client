import PageShell from "@/shared/components/PageShell";
import { MessageContent } from "@/features/messages";

export default function Messages() {
  return <PageShell title="Повідомлення" children={<MessageContent />} />;
}
