import { useNavigate } from 'react-router-dom'
import AuthCard from '../components/auth/AuthCard'
import AuthLayout from '../components/auth/AuthLayout'
import RegisterForm from '../components/auth/RegisterForm'

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
