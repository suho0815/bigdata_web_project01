import type {
  FC,
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
  ChangeEventHandler,
  FormEventHandler,
  ChangeEvent,
  MouseEventHandler,
  MutableRefObject
} from 'react'

export type LoginbtnProps = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  // PropsWithChildren<HTMLButtonElement> &
  name?: string
  url?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Loginbtn: FC<LoginbtnProps> = ({
  className: _className,
  name,
  children,
  onClick
}) => {
  // e bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800
  const className = [
    'w-full',
    'px-4',
    'py-2',
    'mb-4',
    'font-bold',
    'text-white',
    'bg-blue-500',
    'hover:bg-blue-600',
    'rounded',
    _className
  ].join(' ')
  return (
    <button className={className} type="button" onClick={onClick}>
      {name}
      {children}
    </button>
  )
}

export type LoginInputProps = DetailedHTMLProps<
  HTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  type?: string
  id?: string
  placeholder?: string
  Inputref?: MutableRefObject<HTMLInputElement | null>
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const LoginInput: FC<LoginInputProps> = ({
  className: _className,
  type,
  id,
  placeholder,
  Inputref,
  onChange
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
  return (
    <input
      type={type}
      className={className}
      id={id}
      onChange={onChange}
      ref={Inputref}
      placeholder={placeholder}
    />
  )
}
