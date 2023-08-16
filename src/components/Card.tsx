import type {FC} from 'react'
import type {DivProps} from './Div'
import {Div} from './Div'
import {Icon} from './Icon'
import {Itemtitle, Itemsummary} from './Title'
import {GetHoneyImageFile} from '../util'
import {useEffect, useState} from 'react'

export type CardProps = DivProps & {
  imgsrc?: string
  boardName?: string
  heart?: number
  views?: number
}

export const Card: FC<CardProps> = ({imgsrc, boardName, heart, views}) => {
  // console.log(imgsrc)
  const [imageFile, setImageFile] = useState<string>()
  //GetFreeImageFile
  //GetHoneyImageFile
  useEffect(() => {
    if (imgsrc) GetHoneyImageFile(imgsrc, setImageFile)
  }, [])

  return (
    <Div className="m-2 border shadow-lg rounded-xl" width="20rem">
      <Div className="relative m-auto border h-52 rounded-t-xl" width="20rem">
        <img src={imgsrc} alt="" className="object-cover w-full h-full rounded-t-xl " />
      </Div>
      <Div className="flex flex-col p-2">
        <Div height="4rem">
          <Div className="">
            <Div className="flex flex-row items-center justify-around ml-2">
              <Itemtitle className="text-xs font-bold">{boardName}</Itemtitle>
              <Div className="flex text-xs text-gray-500">
                <Itemsummary className="flex items-center mr-3">
                  <Icon name="favorite" className="mr-1" />
                  {heart}
                </Itemsummary>
                <Itemsummary className="flex items-center">
                  <Icon name="visibility" className="mr-1" />
                  {views}
                </Itemsummary>
              </Div>
            </Div>
          </Div>
        </Div>
      </Div>
    </Div>
  )
}
