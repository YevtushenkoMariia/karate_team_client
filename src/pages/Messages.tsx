import PageShell from "../shared/components/PageShell";
import MessageContent from "../features/messages/components/MessageContent";

export default function Messages() {
  return <PageShell title="Повідомлення" children={<MessageContent />} />;
}
