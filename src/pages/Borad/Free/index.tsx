import {FC} from 'react'
import {Div} from '../../../components'
import {BoardMenu} from '../BoardMenu'
import {FreeBoardItem} from './FreeBoardItem'
import FreeFilter from './FreeFilter'

const Free = () => {
  // 2열로 모바일 1열
  return (
    <section className="flex flex-col items-center w-full h-full p-10 mt-8 ">
      <FreeFilter />
      <div className="flex justify-center w-full border-y-2 border-mint">
        <FreeBoardItem />
        <FreeBoardItem />
      </div>
    </section>
  )
}

export default Free
