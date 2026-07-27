import type { ReactNode } from 'react'

type AuthCardProps = {
  title: string
  subtitle: string
  children: ReactNode
}

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-md">
      <div className="mb-8 space-y-2">
        <h1
          className="text-3xl font-bold text-(--black)"
          style={{ fontFamily: 'var(--font-family-header)' }}
        >
          {title}
        </h1>
        <p className="text-sm text-(--dark-grey)">{subtitle}</p>
      </div>
      {children}
    </div>
  )
}
