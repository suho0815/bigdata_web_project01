import {Link} from 'react-router-dom'
import {FC, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {Div} from '../../components'
import BoardMenu from './BoardMenu'
import Free from './Free'
import Honey from './Honey'

const Board: React.FC = () => {
  const [isFree, setIsFree] = useState<boolean>(false)
  const boardParams = useParams().board1

  useEffect(() => {
    if (boardParams === 'free') setIsFree(true)
    else if (boardParams === 'honey') setIsFree(false)
  }, [boardParams])

  return (
    <Div className="flex flex-col items-center w-full h-full ">
      <BoardMenu />
      {isFree === true ? <Free /> : <Honey />}
    </Div>
  )
}

export default Board
