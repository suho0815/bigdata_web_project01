import type {FC} from 'react'
import {Div, DivProps, Itemsummary, Itemtitle, Icon} from '../../../components'
import choco3 from '../../../images/choco3.jpg'

export type FreeBoardProps = DivProps & {}

export const FreeBoardItem: FC<FreeBoardProps> = () => {
  return (
    <Div className="m-8 border shadow-lg md:my-8 md:m-0 rounded-xl h-80 w-80 md:w-full md:h-full">
      <Div className="relative m-auto border rounded-t-xl">
        <img src={choco3} alt="" className="object-cover w-full h-full rounded-t-xl " />
      </Div>
      <Div className="flex flex-col p-2">
        <Div className="h-36">
          <Div className="flex flex-row items-center justify-around ml-2">
            <Itemtitle className="font-bold text-xm">제목</Itemtitle>
            <Div className="flex">
              <Itemsummary className="mr-2 text-gray-500 text-xm">
                <Icon name="favorite" />
              </Itemsummary>
              <Itemsummary className="text-gray-500 text-xm">
                <Icon name="chat_bubble" />
              </Itemsummary>
            </Div>
          </Div>
          <Div className="flex justify-around">
            <Itemtitle className="font-bold text-xm">작성자</Itemtitle>
            <Itemsummary>작성날짜</Itemsummary>
          </Div>
        </Div>
      </Div>
    </Div>
  )
}
