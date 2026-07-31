import { useState } from 'react'
import type { FormEvent } from 'react'
import FormField from './FormField'
import userIcon from '../assets/icons/user.svg'
import lockIcon from '../assets/icons/lock.svg'
import { authService } from '../services/auth'
import { TOKEN_KEY, USER_KEY } from '../constants/storage'
import { useNavigate } from 'react-router-dom';

type LoginFormProps = {
  onRegisterClick?: () => void
}

export default function LoginForm({ onRegisterClick }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
        icon={<img src={userIcon} alt="" className="h-5 w-5" />}
      />

      <FormField
        id="password"
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        icon={<img src={lockIcon} alt="" className="h-5 w-5" />}
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
