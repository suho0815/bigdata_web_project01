import type {
  FC,
  DetailedHTMLProps,
  MouseEventHandler,
  HTMLAttributes,
  PropsWithChildren
} from 'react'

export type WidthHeight = {
  width?: string
  height?: string
  left?: string
  right?: string
  top?: string
  bottom?: string
}

export type ReactDivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  src?: string
  divref?: React.MutableRefObject<HTMLDivElement | null>
  onClick?: MouseEventHandler<HTMLDivElement> | undefined
}

export type DivProps = ReactDivProps & PropsWithChildren<WidthHeight>

export const Div: FC<DivProps> = ({
  style: _style,
  className,
  width,
  height,
  src,
  left,
  right,
  top,
  bottom,
  divref,
  onClick,
  ...props
}) => {
  const style = {
    _style,
    width,
    height,
    backgroundImage: src && `url(${src})`,
    left,
    right,
    top,
    bottom
  }
  return (
    <div
      {...props}
      ref={divref}
      onClick={onClick}
      className={className}
      style={style}></div>
  )
}
