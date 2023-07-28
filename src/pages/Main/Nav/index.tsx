import type {ChangeEventHandler, FC} from 'react'
import {useRef, useState, useCallback} from 'react'
import {Icon, Div, Modal, ModalContent, ModalAction} from '../../../components'
import {Title, Subtitle, Select} from '../../../components'
import {Link} from 'react-router-dom'
import navdog from '../../../images/nav-dog.png'

const Nav = () => {
  const [open, setOpen] = useState<boolean>(false)

  window.addEventListener('scroll', function () {
    var newVal =
      window.scrollY ||
      window.pageXOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop

    console.log(newVal)
  })

  const detailSearchClosed = useCallback(() => {
    setOpen(false)
  }, [])

  const provinceChange = () => {}

  return (
    <header className="fixed z-20 w-full bg-mint md:h-16 h-28 md:before:h-0 before:h-10 before:w-full before:absolute before:bg-lightmint">
      <Div className="w-full">
        <Div className="absolute left-0 z-30 bottom-1 top-3 md:-top-9 md:left-1/2 md:-translate-x-1/2">
          <Link to="/">
            <img src={navdog} alt="" className=" h-36" />
          </Link>
        </Div>
        <Div className="absolute right-0 top-2 md:hidden">
          <ul className="flex">
            <li className="mr-4">
              <Link to="/login">로그인</Link>
            </li>
            <li className="mr-8">
              <Link to="/join">회원가입</Link>
            </li>
          </ul>
        </Div>

        <Div className="w-full">
          <Div className="absolute w-full h-16 top-11 md:hidden">
            <ul className="flex items-center justify-center w-full h-full text-xl font-bold text-white">
              <li className="p-4 mr-8">
                <Link to="/find">동물병원찾기</Link>
              </li>
              <li className="p-4 mr-8">
                <Link to="/">리뷰</Link>
              </li>
              <li className="p-4 mr-8">
                <Link to="/">꿀팁</Link>
              </li>
            </ul>
          </Div>
        </Div>
      </Div>
    </header>
  )
}
export default Nav
