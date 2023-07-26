import type {FC, DetailedHTMLProps, HTMLAttributes, PropsWithChildren} from 'react'
import {DivProps} from './Div'

export type InputSelect = DivProps & {
  selectClass?: string
  labelClass?: string
  selectChildren?: string
  labelChildren?: string
}

export type SelectProps = PropsWithChildren<InputSelect> & {}

export const Select: FC<SelectProps> = ({
  className: _className,
  selectClass,
  labelClass,
  selectChildren,
  labelChildren,
  style: _style
}) => {
  const className = ['flex', 'flex-col', 'ml-8', _className].join(' ')
  const labelclass = ['ml-2', 'font-bold', labelClass].join(' ')
  const selectclass = ['input', 'input-xs', 'input-primary', selectClass].join(' ')

  return (
    <div className={className}>
      <label htmlFor="sido" className={labelclass}>
        {labelChildren}
      </label>
      <select name="sido" id="" className={selectclass}>
        <option value="">선택</option>
        {selectChildren}
      </select>
    </div>
  )
}
