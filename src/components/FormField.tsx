import type { ChangeEventHandler, InputHTMLAttributes, ReactNode } from 'react'

type FormFieldProps = {
  id: string
  type?: string
  placeholder?: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  icon?: ReactNode
  trailing?: ReactNode
} & Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'onChange' | 'id'
>

export default function FormField({
  id,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  icon,
  trailing,
  ...rest
}: FormFieldProps) {
  return (
    <label htmlFor={id} className="relative block">
      {icon && (
        <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-(--dark-grey)">
          {icon}
        </span>
      )}
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-2xl border border-(--grey) bg-(--grey)/40 py-3.5 text-(--black) outline-none transition placeholder:text-(--dark-grey) focus:border-(--red) focus:bg-white ${
          icon ? 'pl-12' : 'pl-4'
        } ${trailing ? 'pr-12' : 'pr-4'}`}
        {...rest}
      />
      {trailing && (
        <span className="absolute top-1/2 right-4 -translate-y-1/2">{trailing}</span>
      )}
    </label>
  )
}
