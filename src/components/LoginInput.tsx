import type {FC, DetailedHTMLProps, HTMLAttributes, PropsWithChildren} from 'react'

export type LoginbtnProps = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  // PropsWithChildren<HTMLButtonElement> &
  name?: string
}

export const Loginbtn: FC<LoginbtnProps> = ({className: _className, name, children}) => {
  const className = [
    'w-full',
    'px-4',
    'py-2',
    'mb-4',
    'font-bold',
    'text-white',
    'bg-blue-500',
    'rounded',
    'hover:bg-slate-500',
    _className
  ].join(' ')
  return (
    <button className={className} type="button">
      {name}
      {children}
    </button>
  )
}

export type LoginInputProps = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  type?: string
  id?: string
  placeholder?: string
}

export const LoginInput: FC<LoginInputProps> = ({
  className: _className,
  type,
  id,
  placeholder
}) => {
  const className = [
    'w-full',
    'px-3',
    'py-2',
    'border',
    'rounded',
    'shadow',
    'appearance-none',
    _className
  ].join(' ')
  return <input type={type} className={className} id={id} placeholder={placeholder} />
}
