import type {
  FC,
  DetailedHTMLProps,
  HTMLAttributes,
  CSSProperties,
  MouseEventHandler
} from 'react'

type ReactSpanProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

export type IconProps = ReactSpanProps & {
  name: string
  style?: CSSProperties
  onClick?: MouseEventHandler<HTMLSpanElement>
}

export const Icon: FC<IconProps> = ({
  name,
  className: _className,
  style: _style,
  onClick,
  ...props
}) => {
  const className = ['material-icons', _className].join(' ')
  return (
    <span className={className} style={_style} {...props} onClick={onClick}>
      {name}
    </span>
  )
}
