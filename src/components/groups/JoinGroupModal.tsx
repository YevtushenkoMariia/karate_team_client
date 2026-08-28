import { useEffect, useState, type FormEvent } from "react";
import { Hash, X } from "lucide-react";
import FormField from "../FormField";
import { groupService } from "../../services/groups";
import { getStoredUser } from "../../constants/storage";
import axios from "axios";

type JoinGroupModalProps = {
  open: boolean;
  onClose: () => void;
  onJoined: () => void;
};

export default function JoinGroupModal({
  open,
  onClose,
  onJoined,
}: JoinGroupModalProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setCode("");
      setError("");
      setIsSubmitting(false);
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedCode = code.trim();
    if (!trimmedCode) {
      setError("Введіть код групи");
      return;
    }

    const user = getStoredUser();
    setIsSubmitting(true);
    setError("");

    try {
      await groupService.joinGroup(user.id, trimmedCode);
      onJoined();
      onClose();
    } catch (joinError) {
      if (axios.isAxiosError(joinError)) {
        const message =
          joinError.response?.data?.message ??
          "Не вдалося приєднатися. Перевірте код групи.";
        setError(typeof message === "string" ? message : "Не вдалося приєднатися.");
      } else {
        setError("Не вдалося приєднатися. Спробуйте ще раз.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Закрити"
        className="absolute inset-0 bg-(--black)/40"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md rounded-[24px] bg-(--white) p-6 shadow-xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2
              className="text-modal-title text-(--black)"
              style={{ fontFamily: "var(--font-family-header)" }}
            >
              Приєднатися до групи
            </h2>
            <p className="text-small text-(--dark-grey)">
              Введіть код групи, щоб стати її учасником
            </p>
          </div>

          <button
            type="button"
            aria-label="Закрити"
            onClick={onClose}
            className="rounded-lg p-2 text-(--dark-grey) transition-colors hover:bg-(--hover-nav-bg) hover:text-(--black)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form className="space-y-4" onSubmit={(event) => void handleSubmit(event)}>
          <FormField
            id="group-code"
            placeholder="Код групи"
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              if (error) setError("");
            }}
            icon={<Hash className="h-5 w-5" />}
            autoFocus
          />

          {error && <p className="text-sm font-medium text-(--red)">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-5 py-2.5 text-button text-(--dark-grey) transition-colors hover:bg-(--hover-nav-bg) hover:text-(--black)"
            >
              Скасувати
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-(--red) px-5 py-2.5 text-button text-white transition hover:bg-(--middle-red) disabled:opacity-60"
            >
              {isSubmitting ? "Приєднання..." : "Приєднатися"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
