import type {FC} from 'react'
import type {DivProps} from '../../../components'
import {Div} from '../../../components'

export type CommunityListProps = DivProps & {
  title?: string
  lank?: number
  listtitle?: string
  address?: string
}

const CommunityList: FC<CommunityListProps> = ({title, listtitle, lank, address}) => {
  return (
    <Div>
      <div>{title}</div>
      <ul className="flex">
        <li>{lank}</li>
        <li>{listtitle}</li>
        <li>{address}</li>
      </ul>
    </Div>
  )
}

export default CommunityList
