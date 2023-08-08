import type {FC} from 'react'
import {DivProps, Div} from '../../components'
import {Subtitle} from '../../components'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useSetRecoilState, useRecoilValue} from 'recoil'
import {isFree} from '../../store/RecoilAtom'

export type BoardMenuProps = DivProps & {}

export const BoardMenu: FC<BoardMenuProps> = () => {
  const board1 = useParams().board1

  //recoil 사용 선언부
  const setIsFree = useSetRecoilState(isFree)
  const isfree = useRecoilValue(isFree)

  useEffect(() => {
    if (board1 === 'free') {
      setIsFree(true)
    } else if (board1 === 'honey') {
      setIsFree(false)
    }
  }, [board1])

  return (
    <Div className="flex flex-col items-center justify-center w-full border pt-28 bg-lightmint lg:pt-16">
      <Subtitle className="mb-8 mt-11">커뮤니티</Subtitle>
      <ul className="relative flex items-center h-20 text-xl font-bold text-center bg-white border-b-2 shadow top-7 text-mint border-mint w-96">
        <Link
          to="/board/free"
          className={`flex items-center justify-center w-full h-full ${
            isfree ? 'bg-mint text-white' : ''
          }`}>
          <li>반려동물 자랑하기</li>
        </Link>
        <Link
          to="/board/honey"
          className={`flex items-center justify-center w-full h-full ${
            isfree ? '' : 'bg-mint text-white'
          }`}>
          <li>꿀팁</li>
        </Link>
      </ul>
    </Div>
  )
}

export default BoardMenu
