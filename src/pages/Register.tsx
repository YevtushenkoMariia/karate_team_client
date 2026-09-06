import { useNavigate } from 'react-router-dom'
import AuthCard from '../features/auth/components/AuthCard'
import AuthLayout from '../features/auth/components/AuthLayout'
import RegisterForm from '../features/auth/components/RegisterForm'

export default function Register() {
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <AuthCard
        title="Створення акаунту"
        subtitle="Зареєструйтеся, щоб отримати доступ"
      >
        <RegisterForm onLoginClick={() => navigate('/login')} />
      </AuthCard>
    </AuthLayout>
  )
}
