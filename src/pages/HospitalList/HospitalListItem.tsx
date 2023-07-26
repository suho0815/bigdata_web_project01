import type {FC} from 'react'
import type {DivProps} from '../../components'
import {Itemtitle, Itemsummary, Icon} from '../../components'

export type ListItem = DivProps & {
  imgsrc?: string
  title: string
  telephone?: string
  location?: string
}

const HospitalListItem: FC<ListItem> = ({
  className: _className,
  imgsrc,
  title,
  telephone,
  location
}) => {
  const src = imgsrc ? imgsrc : ''
  const className = ['flex', 'border', 'h-44', _className].join(' ')
  return (
    <div className={className}>
      <div className="w-2/5">
        <img src={src} alt="" className="m-1 h-5/6 rounded-3xl" />
      </div>
      <div className="ml-4">
        <Itemtitle>{title}</Itemtitle>
        <Itemsummary>{telephone}</Itemsummary>
        <Itemsummary>{location}</Itemsummary>
        <div className="flex justify-end text-xs align-bottom">
          더 보기
          <Icon name="arrow_forward_ios" className="text-xs" />
        </div>
      </div>
    </div>
  )
}
export default HospitalListItem
