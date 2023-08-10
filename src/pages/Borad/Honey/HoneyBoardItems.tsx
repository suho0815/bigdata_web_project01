import type {FC, MouseEventHandler} from 'react'
import {Div, DivProps, Subtitle, Icon, Itemsummary, Itemtitle} from '../../../components'
import choco1 from '../../../images/choco1.jpg'

export type HoneyBoardProps = DivProps & {
  title?: string
  writer?: string
  date?: string
  heart?: number
  views?: number
  replycnt?: number
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const HoneyBoardItem: FC<HoneyBoardProps> = ({
  title,
  writer,
  date,
  heart,
  views,
  replycnt,
  onClick
}) => {
  return (
    <Div
      className="flex w-full h-64 py-4 bg-gray-100 border-y md:flex-col md:h-96 hover:cursor-pointer hover:bg-gray-200"
      onClick={onClick}>
      <Div className="h-56 w-96 md:w-full">
        <img src={choco1} alt="" className="object-cover w-full h-full" />
      </Div>

      <Div className="w-1/2 md:mt-4 md:h-1/2 md:w-full md:flex md:justify-evenly">
        <Subtitle className="mb-6">{title}</Subtitle>
        <Subtitle>
          <Icon name="person" /> {writer}
        </Subtitle>
      </Div>
      <Div className="w-1/2 md:h-1/2 md:items-center md:w-full md:flex md:justify-evenly">
        <p className="mb-4 text-center align-middle">
          <Icon name="favorite" className="mr-3" />
          {heart !== undefined ? heart : 0}
        </p>
        <Itemsummary className="mb-4 md:mb-0 ">조회 수 {views}</Itemsummary>
        <Itemsummary className="">{date}</Itemsummary>
      </Div>
    </Div>
  )
}
