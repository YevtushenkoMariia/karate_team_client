import { useNavigate } from 'react-router-dom'
import { AuthCard, AuthLayout, LoginForm } from '@/features/auth'

export default function Login() {
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <AuthCard title="Ласкаво просимо" subtitle="Увійдіть у свій акаунт">
        <LoginForm onRegisterClick={() => navigate('/register')} />
      </AuthCard>
    </AuthLayout>
  )
}
