import PageShell from "../components/PageShell";
import MessageContent from "../components/messages/MessageContent";

export default function Messages() {
  return <PageShell title="Повідомлення" children={<MessageContent />} />;
}
