import type {FC, DetailedHTMLProps, HTMLAttributes} from 'react'
import type {WidthHeight} from './Div'

export type TitleProps = WidthHeight &
  DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & {}

export const Title: FC<TitleProps> = ({
  className: _className,
  style: _style,
  width,
  height,
  ...props
}) => {
  const style = {_style, width, height}
  const className = ['font-bold', 'text-5xl', 'text-center', _className].join(' ')
  return <p {...props} className={className} style={style}></p>
}

export type SubtitleProps = WidthHeight &
  DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & {}

export const Subtitle: FC<SubtitleProps> = ({
  className: _className,
  style: _style,
  width,
  height,
  ...props
}) => {
  const style = {_style, width, height}
  const className = ['font-bold', 'text-2xl', 'text-center', _className].join(' ')

  return <p {...props} className={className} style={style}></p>
}

export type ItemtitleProps = WidthHeight &
  DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & {}

export const Itemtitle: FC<ItemtitleProps> = ({
  className: _className,
  style: _style,
  width,
  height,
  ...props
}) => {
  const style = {_style, width, height}
  const className = ['font-bold', 'text-lg', 'text-center', _className].join(' ')
  return <p {...props} className={className} style={style}></p>
}

export type ItemsummaryProps = WidthHeight &
  DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> & {}

export const Itemsummary: FC<ItemsummaryProps> = ({
  className: _className,
  style: _style,
  width,
  height,
  ...props
}) => {
  const style = {_style, width, height}
  const className = ['text-sm', 'text-center', _className].join(' ')
  return <p {...props} className={className} style={style}></p>
}
