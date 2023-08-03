import {FC} from 'react'
import {Div} from '../../../components'
import {HoneyBoardItem} from './HoneyBoardItems'
import HoneyFilter from './HoneyFilter'

const Honey = () => {
  return (
    <section className="flex flex-col items-center w-full h-full p-10 mt-8 ">
      <HoneyFilter />
      <div className="w-full border-y-2 border-mint">
        <HoneyBoardItem />
        <HoneyBoardItem />
      </div>
    </section>
  )
}

export default Honey
