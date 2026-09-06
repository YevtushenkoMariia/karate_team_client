import { useState } from "react";
import type { FormEvent } from "react";
import FormField from "../../../shared/components/FormField";
import { EyeIcon, EyeOffIcon, User, Mail, Lock } from "lucide-react";
import type { Role } from "../../../shared/types/roles";
import { authService } from "../services/auth.service";
import { TOKEN_KEY } from "../constants/storage.constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type RegisterFormProps = {
  onLoginClick?: () => void;
};

export default function RegisterForm({ onLoginClick }: RegisterFormProps) {
  const [role, setRole] = useState<Role>("SPORTSMAN");
  const [name, setFirstName] = useState("");
  const [surname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await authService.register({
        role,
        name,
        surname,
        password,
        confirmPassword,
        email,
      });

      if (result.success === true) {
        localStorage.setItem(TOKEN_KEY, result.token);
        console.log(result.data);

        console.log("IT IS SUCCESFULL)))");
        navigate("/home");
      } else {
        console.log("Registration failed");
        console.log(result.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.status);
        console.log(error.response?.data);
      }
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="flex rounded-2xl border border-(--grey) bg-(--grey)/30 p-1">
        <button
          type="button"
          onClick={() => setRole("SPORTSMAN")}
          className={`h-8 flex-1 rounded-xl text-small-bold transition ${
            role === "SPORTSMAN"
              ? "bg-(--red) text-white"
              : "text-(--dark-grey) hover:text-(--red)"
          }`}
        >
          Спортсмен
        </button>
        <button
          type="button"
          onClick={() => setRole("COACH")}
          className={`h-8 flex-1 rounded-xl text-small-bold transition ${
            role === "COACH"
              ? "bg-(--red) text-white"
              : "text-(--dark-grey) hover:text-(--red)"
          }`}
        >
          Тренер
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="lastName"
          type="text"
          placeholder="Прізвище"
          value={surname}
          onChange={(event) => setLastName(event.target.value)}
          icon={<User className="h-5 w-5" />}
        />
        <FormField
          id="firstName"
          type="text"
          placeholder="Ім’я"
          value={name}
          onChange={(event) => setFirstName(event.target.value)}
          icon={<User className="h-5 w-5" />}
        />
      </div>

      <FormField
        id="email"
        type="email"
        placeholder="Електронна пошта"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        icon={<Mail className="h-5 w-5" />}
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
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Приховати пароль" : "Показати пароль"}
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

      <FormField
        id="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Підтвердіть пароль"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        icon={<Lock className="h-5 w-5" />}
        trailing={
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            aria-label={
              showConfirmPassword ? "Приховати пароль" : "Показати пароль"
            }
            className="flex items-cente"
          >
            {showConfirmPassword ? (
              <EyeOffIcon className="h-5 w-5 text-(--dark-grey)" />
            ) : (
              <EyeIcon className="h-5 w-5 text-(--dark-grey)" />
            )}
          </button>
        }
      />

      <button
        type="submit"
        className="h-12 w-full rounded-2xl bg-(--red) text-button text-white transition hover:bg-(--middle-red)"
      >
        Зареєструватися
      </button>

      <p className="text-center text-small text-(--dark-grey)">
        Вже маєш акаунт?{" "}
        <button
          type="button"
          onClick={onLoginClick}
          className="font-bold text-(--red) hover:text-(--dark-red)"
        >
          Увійти
        </button>
      </p>
    </form>
  );
}
