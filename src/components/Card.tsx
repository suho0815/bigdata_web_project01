import type {FC} from 'react'
import type {DivProps} from './Div'
import {Div} from './Div'
import {Icon} from './Icon'
import {Itemtitle, Itemsummary} from './Title'

export type CardProps = DivProps & {
  imgsrc?: string
  hospitalName?: string
  locate?: string
}

export const Card: FC<CardProps> = ({imgsrc, hospitalName, locate}) => {
  return (
    <Div className="m-2 border shadow-lg rounded-xl" width="20rem">
      <Div className="relative m-auto border h-52 rounded-t-xl" width="20rem">
        <img src={imgsrc} alt="" className="object-cover w-full h-full" />
      </Div>
      <Div className="flex flex-col p-2">
        <Div height="4rem">
          <Div className="">
            <Div className="flex flex-row items-center justify-around ml-2">
              <Itemtitle className="text-xs font-bold">{hospitalName}</Itemtitle>
              <Itemsummary className="text-xs text-gray-500">{locate}</Itemsummary>
            </Div>
          </Div>
        </Div>
      </Div>
    </Div>
  )
}
