import type {FC} from 'react'
import {DivProps, Div} from '../../components'
import {Subtitle} from '../../components'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'

export type BoardMenuProps = DivProps & {}

export const BoardMenu: FC<BoardMenuProps> = () => {
  const [freeOpen, setFreeOpen] = useState<boolean>(false)
  const [honeyOpen, setHoneyOpen] = useState<boolean>(false)
  const board1 = useParams().board1

  useEffect(() => {
    if (board1 === 'free') {
      setFreeOpen(true)
      setHoneyOpen(false)
    } else if (board1 === 'honey') {
      setFreeOpen(false)
      setHoneyOpen(true)
    }
  }, [board1])

  return (
    <Div className="flex flex-col items-center justify-center w-full border pt-28 bg-lightmint lg:pt-16">
      <Subtitle className="mt-10 mb-8">커뮤니티</Subtitle>
      <ul className="relative flex items-center h-20 text-xl font-bold text-center bg-white border-b-2 text-mint border-mint w-96 top-10">
        <Link
          to="/board/free"
          className={`flex items-center justify-center w-full h-full ${
            freeOpen ? 'bg-mint text-white' : ''
          }`}>
          <li>반려동물 자랑하기</li>
        </Link>
        <Link
          to="/board/honey"
          className={`flex items-center justify-center w-full h-full ${
            honeyOpen ? 'bg-mint text-white' : ''
          }`}>
          <li>꿀팁</li>
        </Link>
      </ul>
    </Div>
  )
}

export default BoardMenu
