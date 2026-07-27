import { useState } from 'react'
import type { FormEvent } from 'react'
import FormField from './FormField'
import userIcon from '../assets/icons/user.svg'
import lockIcon from '../assets/icons/lock.svg'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: add actual login handling here
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
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
        <button type="button" className="font-bold text-(--red) hover:text-(--dark-red)">
          Зареєструватися
        </button>
      </p>
    </form>
  )
}
