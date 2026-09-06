import { useNavigate } from 'react-router-dom'
import AuthCard from '../features/auth/components/AuthCard'
import AuthLayout from '../features/auth/components/AuthLayout'
import LoginForm from '../features/auth/components/LoginForm'

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
