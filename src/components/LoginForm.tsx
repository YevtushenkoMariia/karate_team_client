import { useState } from 'react'
import type { FormEvent } from 'react'
import FormField from './FormField'
import {User, Lock,  EyeIcon, EyeOffIcon  } from "lucide-react";




import { authService } from '../services/auth'
import { TOKEN_KEY, USER_KEY } from '../constants/storage'
import { useNavigate } from 'react-router-dom';

type LoginFormProps = {
  onRegisterClick?: () => void
}

export default function LoginForm({ onRegisterClick }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()



    try {
      const result = await authService.login({email, password});  
      if(result.success == true) {
        localStorage.setItem(TOKEN_KEY, result.token);
        localStorage.setItem(USER_KEY, JSON.stringify(result.user));
        navigate("/home");
    
        console.log("OK")
      }else{
        console.log("FAILED")
        console.log(result);
      }
     

    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
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
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Приховати пароль" : "Показати пароль"}
            className="flex items-center"
          >
            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        }
      />

      <div className="flex justify-end">
        <button
          type="button"
          className="text-sm font-semibold text-(--red) hover:text-(--dark-red)"
        >
          Забули пароль?
        </button>
      </div>

      <button
        type="submit"
        className="h-12 w-full rounded-2xl bg-(--red) text-base font-bold text-white transition hover:bg-(--middle-red)"
      >
        Увійти
      </button>

      <p className="text-center text-sm text-(--dark-grey)">
        Не маєш профілю?{' '}
        <button
          type="button"
          onClick={onRegisterClick}
          className="font-bold text-(--red) hover:text-(--dark-red)"
        >
          Зареєструватися
        </button>
      </p>
    </form>
  )
}
