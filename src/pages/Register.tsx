import { useNavigate } from 'react-router-dom'
import AuthCard from '../components/AuthCard'
import AuthLayout from '../components/AuthLayout'
import RegisterForm from '../components/RegisterForm'

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
