import type {
  FC,
  PropsWithChildren,
  ReactElement,
  ChangeEventHandler,
  FormEventHandler
} from 'react'
import {useState} from 'react'
import {DivProps} from './Div'

export type InputSelect = DivProps & {
  selectClass?: string
  labelClass?: string
  selectChildren?: ReactElement[]
  labelChildren?: string
  id?: string
  selectRef?: React.MutableRefObject<HTMLSelectElement | null>
  onChange?: React.ChangeEventHandler<HTMLSelectElement>
}

export type SelectProps = PropsWithChildren<InputSelect> & {
  name?: string
}

export const Select: FC<SelectProps> = ({
  className: _className,
  name,
  selectClass,
  labelClass,
  selectChildren,
  labelChildren,
  style: _style,
  id,
  selectRef,
  onChange: _onChange
}) => {
  const className = ['flex', 'flex-col', _className].join(' ')
  const labelclass = ['ml-2', 'font-bold', labelClass].join(' ')
  const selectclass = ['input', 'input-xs', 'input-info', selectClass].join(' ')

  return (
    <div className={className}>
      <label htmlFor={name} className={labelclass}>
        {labelChildren}
      </label>
      <select
        name={name}
        id={id}
        className={selectclass}
        ref={selectRef}
        onChange={_onChange}>
        <option value="">선택</option>
        {selectChildren}
      </select>
    </div>
  )
}
