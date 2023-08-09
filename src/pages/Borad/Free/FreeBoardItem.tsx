import type {FC} from 'react'
import {Div, DivProps, Itemsummary, Itemtitle, Icon} from '../../../components'
import choco3 from '../../../images/choco3.jpg'
import noImg from '../../../images/No-image-found.jpg'

export type FreeBoardProps = DivProps & {
  title?: string
  writer?: string
  date?: string
  heart?: number
  replycnt?: number
  img?: string
}

export const FreeBoardItem: FC<FreeBoardProps> = ({
  title,
  writer,
  date,
  heart,
  replycnt,
  img
}) => {
  return (
    <Div className="m-8 border shadow-lg md:mt-4 md:mb-4 md:m-0 rounded-xl h-96 w-80 md:w-full ">
      <Div className="relative w-full h-64 m-auto border rounded-t-xl ">
        <img
          src={img ? img : choco3}
          alt=""
          className="object-cover w-full h-full rounded-t-xl "
        />
      </Div>
      <Div className="flex flex-col h-24 p-2">
        <Div className="h-full">
          <Div className="flex flex-row items-center justify-around ml-2 h-1/2">
            <Itemtitle className="font-bold text-xm">{title}</Itemtitle>
            <Div className="flex">
              <Itemsummary className="mr-2 text-gray-500 text-xm">
                <Icon name="favorite" />
              </Itemsummary>
              <Itemsummary className="text-gray-500 text-xm">
                <Icon name="chat_bubble" />
              </Itemsummary>
            </Div>
          </Div>
          <Div className="flex justify-around h-1/2">
            <Itemsummary className="font-bold text-xm">
              <Icon name="person" />
              {writer}
            </Itemsummary>
            <Itemsummary>{date}</Itemsummary>
          </Div>
        </Div>
      </Div>
    </Div>
  )
}
