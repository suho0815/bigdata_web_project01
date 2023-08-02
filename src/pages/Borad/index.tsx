import {Link} from 'react-router-dom'
import {FC} from 'react'
import {Div} from '../../components'
import BoardMenu from './BoardMenu'

const Board: React.FC = () => {
  return (
    <Div className="flex flex-col items-center w-full h-full border ">
      <BoardMenu />
    </Div>
  )
}

export default Board
