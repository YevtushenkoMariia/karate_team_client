import type { ChangeEventHandler, InputHTMLAttributes, ReactNode } from 'react'

type FormFieldProps = {
  id: string
  type?: string
  placeholder?: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  icon?: ReactNode
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
          icon ? 'pr-4 pl-12' : 'px-4'
        }`}
        {...rest}
      />
    </label>
  )
}
