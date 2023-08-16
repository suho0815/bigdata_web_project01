import {FC, MouseEventHandler, useEffect, useState} from 'react'
import {Div, DivProps, Subtitle, Icon, Itemsummary, Itemtitle} from '../../../components'
import {GetHoneyImageFile} from '../../../util'
import choco1 from '../../../images/choco1.jpg'

export type HoneyBoardProps = DivProps & {
  title?: string
  writer?: string
  date?: string
  heart?: number
  views?: number
  replycnt?: number
  img?: string
  userLikeOnBoard?: number[]
  honeyBoardId?: number
  onClick?: MouseEventHandler<HTMLDivElement>
}

export const HoneyBoardItem: FC<HoneyBoardProps> = ({
  title,
  writer,
  date,
  heart,
  views,
  replycnt,
  img,
  userLikeOnBoard,
  honeyBoardId,
  onClick
}) => {
  const [likeOn, setLikeOn] = useState<boolean>()
  const [imageFile, setImageFile] = useState<string>()

  useEffect(() => {
    if (userLikeOnBoard) {
      if (userLikeOnBoard.includes(honeyBoardId as number)) setLikeOn(true)
      else setLikeOn(false)
    }
    if (img) GetHoneyImageFile(img, setImageFile)
  }, [userLikeOnBoard, honeyBoardId])

  return (
    <Div
      className="flex w-full h-64 py-4 bg-gray-100 border-y md:flex-col md:h-96 hover:cursor-pointer hover:bg-gray-200"
      onClick={onClick}>
      <Div className="h-56 w-96 md:w-full">
        <img
          src={imageFile ? imageFile : choco1}
          alt=""
          className="object-cover w-full h-full"
        />
      </Div>

      <Div className="flex flex-col w-1/2 justify-evenly md:mt-4 md:h-1/2 md:w-full md:flex-row">
        <Subtitle className="mb-6">{title}</Subtitle>
        <Subtitle>
          <Icon name="person" /> {writer}
        </Subtitle>
      </Div>
      <Div className="flex flex-col w-1/2 justify-evenly md:h-1/2 md:items-center md:w-full md:flex-row">
        <p className="mb-4 text-center align-middle">
          <Icon
            name="favorite"
            className={`mr-3 ${likeOn ? 'text-red-500' : 'text-black'}`}
          />
          {heart !== undefined ? heart : 0}
        </p>
        <Itemsummary className="mb-4 md:mb-0 ">조회 수: {views}</Itemsummary>
        <Itemsummary className="">작성 일: {date?.slice(0, 10)}</Itemsummary>
      </Div>
    </Div>
  )
}
