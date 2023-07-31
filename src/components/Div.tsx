import type {FC, DetailedHTMLProps, HTMLAttributes, PropsWithChildren} from 'react'

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
  return <div {...props} className={className} style={style}></div>
}
