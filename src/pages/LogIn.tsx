import { useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import AuthLayout from '../components/AuthLayout'
import LoginForm from '../components/LoginForm'

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
