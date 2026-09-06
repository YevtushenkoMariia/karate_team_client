import { useState } from "react";
import type { FormEvent } from "react";
import { User, Lock, EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import FormField from "../../../shared/components/FormField";
import { authService } from "../services/auth.service";
import { useAuth } from "../hooks/useAuth";

type LoginFormProps = {
  onRegisterClick?: () => void;
};

export default function LoginForm({
  onRegisterClick,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const result = await authService.login({
        email,
        password,
      });

      console.log("Login result:", result);

      if (result.success) {
        const user = {
          id: result.user.id,
          role: result.user.role,
          name: result.user.name,
          surname: result.user.surname,
        };

        login(result.token, user);

        navigate("/home");

        console.log("OK");
      } else {
        console.log("FAILED");
        console.log(result);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      <FormField
        id="email"
        type="email"
        placeholder="Електронна пошта"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        icon={<User className="h-5 w-5" />}
      />

      <FormField
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="Пароль"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        icon={<Lock className="h-5 w-5" />}
        trailing={
          <button
            type="button"
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
            aria-label={
              showPassword
                ? "Приховати пароль"
                : "Показати пароль"
            }
            className="flex items-center"
          >
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5 text-(--dark-grey)" />
            ) : (
              <EyeIcon className="h-5 w-5 text-(--dark-grey)" />
            )}
          </button>
        }
      />

      <div className="flex justify-end">
        <button
          type="button"
          className="text-small font-bold text-(--red) hover:text-(--dark-red)"
        >
          Забули пароль?
        </button>
      </div>

      <button
        type="submit"
        className="h-12 w-full rounded-2xl bg-(--red) text-button text-white transition hover:bg-(--middle-red)"
      >
        Увійти
      </button>

      <p className="text-center text-(--dark-grey) text-small">
        Не маєш профілю?{" "}
        <button
          type="button"
          onClick={onRegisterClick}
          className="text-small-bold text-(--red) hover:text-(--dark-red)"
        >
          Зареєструватися
        </button>
      </p>
    </form>
  );
}