import {FC} from 'react'
import {DivProps, Div, Itemtitle, Select} from '../../../components'

export type FreeFilterProps = DivProps & {}

const FreeFilter: FC<FreeFilterProps> = () => {
  return (
    <Div className="flex flex-col w-full h-56">
      <Div className="flex justify-end w-full">
        <button className="text-white btn bg-gradient-to-r from-green-200 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
          사진 올리기
        </button>
      </Div>
      <Div className="flex justify-between mt-8">
        <Itemtitle className="text-xl text-gray-500">총 ?개</Itemtitle>
        <Div>
          <Select className="input-sm" defaultOption="정렬" />
        </Div>
      </Div>
    </Div>
  )
}

export default FreeFilter
