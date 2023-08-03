import type {FC} from 'react'
import type {DivProps} from '../../../components'
import {Div} from '../../../components'
import {Link} from 'react-router-dom'

export type HospitalList = DivProps & {
  title?: string
  listtitle?: string[] | undefined
  address?: string[] | undefined
}

const HospitalList: FC<HospitalList> = ({
  title,
  listtitle,
  address,
  className: _className
}) => {
  let children = []
  for (let i = 1; i <= 5; i++) {
    children.push(
      <ul className="flex mb-4 text-xl">
        <li className="mr-2 text-mint">{i}</li>
        {listtitle && listtitle[i] !== undefined && (
          <li className="mr-2">{listtitle[i]}</li>
        )}
        {address && address[i] !== undefined && <li>{address[i]}</li>}
      </ul>
    )
  }

  return (
    <Div className="mt-4 w-96">
      <div>{title}</div>
      {children}
    </Div>
  )
}

export default HospitalList
