import {FC} from 'react'
import type {ReactDivProps} from './Div'
import {Div} from './Div'
import {Icon} from './Icon'

export type ModalProps = ReactDivProps & {
  open?: boolean
}

export const Modal: FC<ModalProps> = ({open, className: _className, ...props}) => {
  const className = ['modal', open ? 'modal-open' : '', _className].join(' ')
  return <div className={className} {...props}></div>
}

export type ModalContentProps = ReactDivProps & {
  onCloseIconClicked?: () => void
  closeIconClassName?: string
}

export const ModalContent: FC<ModalContentProps> = ({
  onCloseIconClicked,
  closeIconClassName: _closeIconClassName,
  className: _className,
  children,
  ...props
}) => {
  const className = ['modal-box', _className].join(' ')
  const showCloseIcon = onCloseIconClicked ? true : false
  if (!showCloseIcon)
    return (
      <div {...props} className={className}>
        {children}
      </div>
    )

  const closeIconClassName = _closeIconClassName
    ? _closeIconClassName
    : 'btn btn-primary btn-sm btn-outline'

  return (
    <div {...props} className={className}>
      <Div className="absolute" right="0.5rem" top="0.5rem">
        <Icon name="close" className={closeIconClassName} onClick={onCloseIconClicked} />
      </Div>
      {children}
    </div>
  )
}

export type ModalActionProps = ReactDivProps & {}

export const ModalAction: FC<ModalActionProps> = ({className: _className, ...props}) => {
  const className = ['modal-action', _className].join(' ')
  return <div {...props} className={className}></div>
}
