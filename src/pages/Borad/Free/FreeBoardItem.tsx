import type {FC} from 'react'
import {MouseEventHandler, useEffect, useState} from 'react'
import {Div, DivProps, Icon, Itemsummary, Itemtitle} from '../../../components'
import choco3 from '../../../images/choco3.jpg'
import {getCookie} from '../../../util'
import {GetFreeImageFile} from '../../../util'

export type FreeBoardProps = DivProps & {
  title?: string
  writer?: string
  date?: string
  heart?: number
  replycnt?: number
  freeBoardId?: number
  img?: string
  userLikeOnBoard?: any
  onClick?: () => void
}

export const FreeBoardItem: FC<FreeBoardProps> = ({
  title,
  writer,
  date,
  heart,
  replycnt,
  freeBoardId,
  img,
  userLikeOnBoard,
  onClick
}) => {
  const [likeOn, setLikeOn] = useState<boolean>(false)
  const [imageFile, setImageFile] = useState<string>()

  useEffect(() => {
    if (userLikeOnBoard) {
      if (userLikeOnBoard.includes(freeBoardId)) setLikeOn(true)
      else setLikeOn(false)
    }
    console.log(img)
    if (img) GetFreeImageFile(img, setImageFile)
  }, [userLikeOnBoard, freeBoardId])

  return (
    <Div
      className="m-8 border shadow-lg cursor-pointer md:mt-4 md:mb-4 md:m-0 rounded-xl h-96 w-80 md:w-full"
      onClick={onClick}>
      <Div className="relative w-full h-64 m-auto border rounded-t-xl ">
        <img
          src={imageFile ? imageFile : choco3}
          alt=""
          className="object-cover w-full h-full rounded-t-xl "
        />
      </Div>
      <Div className="flex flex-col h-24 p-2">
        <Div className="h-full">
          <Div className="flex flex-row items-center justify-around ml-2 h-1/2">
            <Itemtitle className="font-bold text-xm">{title}</Itemtitle>
            <Div className="flex">
              <Itemsummary className="flex items-center justify-center mr-2 text-gray-500 text-xm">
                <Icon
                  name="favorite"
                  className={`mr-1 ${likeOn ? 'text-red-500' : 'text-gray-500'}`}
                />
                {heart}
              </Itemsummary>
              <Itemsummary className="flex items-center justify-center mr-2 text-gray-500 text-xm">
                <Icon name="chat_bubble" className="mr-1" />
                {replycnt}
              </Itemsummary>
            </Div>
          </Div>
          <Div className="flex items-center justify-around h-1/2">
            <Itemsummary className="flex items-center font-bold text-xm">
              <Icon name="person" />
              {writer}
            </Itemsummary>
            <Itemsummary>{date ? date.slice(0, 10) : null}</Itemsummary>
          </Div>
        </Div>
      </Div>
    </Div>
  )
}
