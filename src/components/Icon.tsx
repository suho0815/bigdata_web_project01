import type {FC, DetailedHTMLProps, HTMLAttributes, CSSProperties} from 'react'

type ReactSpanProps = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

export type IconProps = ReactSpanProps & {
  name: string
  style?: CSSProperties
}

export const Icon: FC<IconProps> = ({
  name,
  className: _className,
  style: _style,
  ...props
}) => {
  const className = ['material-icons', _className].join(' ')
  return (
    <span className={className} style={_style} {...props}>
      {name}
    </span>
  )
}
