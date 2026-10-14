import { useNavigate } from 'react-router-dom'
import { AuthCard, AuthLayout, RegisterForm } from '@/features/auth'

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
