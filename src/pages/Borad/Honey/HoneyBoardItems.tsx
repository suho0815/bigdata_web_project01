import type {FC} from 'react'
import {Div, DivProps, Subtitle, Icon, Itemsummary, Itemtitle} from '../../../components'
import choco1 from '../../../images/choco1.jpg'

export type HoneyBoardProps = DivProps & {
  title?: string
  writer?: string
  date?: string
  heart?: number
  views?: number
  replycnt?: number
}

export const HoneyBoardItem: FC<HoneyBoardProps> = ({
  title,
  writer,
  date,
  heart,
  views,
  replycnt
}) => {
  return (
    <Div className="flex w-full h-64 py-4 bg-gray-100 border-y md:flex-col md:h-96">
      <Div className="h-56 w-96 md:w-full">
        <img src={choco1} alt="" className="object-cover w-full h-full" />
      </Div>

      <Div className="w-1/2 md:mt-4 md:h-1/2 md:w-full md:flex md:justify-evenly">
        <Subtitle className="mb-6">제목</Subtitle>
        <Subtitle>
          <Icon name="person" /> 작성자
        </Subtitle>
      </Div>
      <Div className="w-1/2 md:h-1/2 md:items-center md:w-full md:flex md:justify-evenly">
        <p className="mb-4 text-center align-middle">
          <Icon name="favorite" />
          좋아요
        </p>
        <Itemsummary className="mb-4 md:mb-0 ">조회수</Itemsummary>
        <Itemsummary className="">작성 날짜</Itemsummary>
      </Div>
    </Div>
  )
}
