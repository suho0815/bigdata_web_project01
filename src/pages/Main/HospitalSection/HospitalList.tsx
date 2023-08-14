import type {FC} from 'react'
import type {DivProps} from '../../../components'
import {Div, Icon} from '../../../components'
import {Link} from 'react-router-dom'

export type HospitalList = DivProps & {
  // title?: string
  listtitle?: string[] | undefined
  address?: string[] | undefined
  newPost?: any
  newReply?: any
}

const HospitalList: FC<HospitalList> = ({
  // title,
  listtitle,
  address,
  newPost,
  newReply,
  className: _className
}) => {
  let children = []
  for (let i = 1; i <= 5; i++) {
    if (newPost !== undefined) {
      // 새로운 글
      children.push(
        <ul className="flex mb-4 text-xl" key={i}>
          <li className="mr-2 text-mint">{i}</li>
          {newPost && newPost[i - 1] !== undefined && (
            <li className="mr-2">{newPost[i - 1]['title']}</li>
          )}
          {newPost && newPost[i - 1] !== undefined && (
            <li>{newPost[i - 1]['nickname']}</li>
          )}
        </ul>
      )
    } else {
      // 새로운 댓글
      children.push(
        <ul className="flex mb-4 text-xl" key={i}>
          <li className="mr-2 text-mint">{i}</li>
          {newReply && newReply[i - 1] !== undefined && (
            <li className="mr-2">{newReply[i - 1]['contents']}</li>
          )}
          {newReply && newReply[i - 1] !== undefined && (
            <li>{newReply[i - 1]['nickname']}</li>
          )}
        </ul>
      )
    }
  }

  return (
    <Div className="mt-4 w-96">
      {/* <div>{title}</div> */}
      {children}
    </Div>
  )
}

export default HospitalList
