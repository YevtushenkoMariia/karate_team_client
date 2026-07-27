import AuthCard from '../components/AuthCard'
import LoginForm from '../components/LoginForm'
import loginIllustration from '../assets/logoSvg.svg'

import redWaves from '../assets/redWavesSvg.svg'
import greenWaves from '../assets/greenWavesSvg.svg'
import clsx from 'clsx'
import { useMediaQuery } from '../hooks/useMediaQuery'

export default function LogIn() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')

  return (
  <div className="relative min-h-screen bg-white overflow-hidden ">
   
    <div  className={clsx(
    'relative z-10 mx-auto flex min-h-screen max-w-[1000px] items-center justify-center px-6 py-20 max-lg:flex-col',
    isMobile ? 'gap-12' : isTablet ? 'gap-20' : 'gap-40'
  )}>
        <div className="flex items-center justify-center pb-20">
          <img
            src={loginIllustration}
            alt=""
            className="h-auto w-full max-w-[320px] shrink-0"
          />
        </div>

        <AuthCard title="Ласкаво просимо" subtitle="Увійдіть у свій акаунт">
          <LoginForm />
        </AuthCard>
      </div>

       {/* Bottom decorative waves */}
       {!isMobile && !isTablet && (
        <>
       <img
        src={greenWaves}
        alt=""
        className="absolute bottom-[60px] right-264 h-[160px]  object-cover"
      />
      <img
        src={redWaves}
        alt=""
        className="absolute bottom-[-210px] right-12 w-full max-w-[1940px] object-cover"
      /></>)}
     
  </div>



  
  )
}
