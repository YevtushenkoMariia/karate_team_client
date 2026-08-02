import type { ReactNode } from 'react'
import clsx from 'clsx'
import loginIllustration from '../../assets/logoSvg.svg'
import redWaves from '../../assets/redWavesSvg.svg'
import greenWaves from '../../assets/greenWavesSvg.svg'
import { useMediaQuery } from '../../hooks/useMediaQuery'

type AuthLayoutProps = {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')

  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      <div
        className={clsx(
          'relative z-10 mx-auto flex min-h-screen max-w-[1000px] items-center justify-center px-6 py-20 max-lg:flex-col',
          isMobile ? 'gap-16' : isTablet ? 'gap-8' : 'gap-40',
          isMobile ? 'pb-0' : isTablet ? 'pb-0' : 'pb-20',
          isMobile ? 'justify-start' : isTablet ? 'justify-center' : 'justify-center',
        )}
      >
        <div className='flex items-center justify-center'>
          <img
            src={loginIllustration}
            alt=""
            className={clsx(
              'h-auto w-full shrink-0',
              isMobile ? 'max-w-[140px]' : isTablet ? 'max-w-[160px]' : 'max-w-[320px]',
              isMobile ? 'pb-0' : isTablet ? 'pb-0 ' : 'pb-20',
              
            )}
          />
        </div>

        {children}
      </div>

      {!isMobile && !isTablet && (
        <>
          <img
            src={greenWaves}
            alt=""
            className="absolute right-264 bottom-[60px] h-[160px] object-cover"
          />
          <img
            src={redWaves}
            alt=""
            className="absolute right-12 bottom-[-210px] w-full max-w-[1940px] object-cover"
          />
        </>
      )}
    </div>
  )
}
