import type {ChangeEventHandler, FC} from 'react'
import {useRef, useEffect, useState, useCallback} from 'react'
import {Icon, Div, Modal, ModalContent, ModalAction} from '../../../components'
import {Title, Subtitle, Select, Itemsummary, Itemtitle} from '../../../components'
import {Link} from 'react-router-dom'
import navdog from '../../../images/nav-dog.png'

import {useNavigate} from 'react-router-dom'
import {useSetRecoilState, useRecoilValue} from 'recoil'
import {isloginToken} from '../../../store/RecoilAtom'
import {getCookie, removeCookie} from '../../../util'

const Nav: FC = () => {
  const [open, setOpen] = useState<boolean>(false)

  // window.addEventListener('scroll', function () {
  //   var newVal =
  //     window.scrollY ||
  //     window.pageXOffset ||
  //     document.documentElement.scrollTop ||
  //     document.body.scrollTop

  //   console.log(newVal)
  // })

  const Navigate = useNavigate()
  //recoil 사용 선언부
  const setIslogin = useSetRecoilState(isloginToken)
  const islogin = useRecoilValue(isloginToken)

  const provinceChange = () => {}

  // .withExpiresAt(new Date(System.currentTimeMillis()+1000*600*10)) // 토큰 유지시간

  useEffect(() => {
    const tokenCookie = getCookie('accessJwtToken:') // 쿠키에서 토큰 가져오기
    if (tokenCookie !== undefined) {
      const token = tokenCookie.trim()
      setIslogin(true) // 토큰 유효성에 따라 로그인 상태 업데이트
    } else {
      setIslogin(false) // 토큰 없음, 사용자는 로그인되지 않음
    }
  }, [])

  const logoutClick = useCallback((e: React.MouseEvent) => {
    setOpen(false)
    setIslogin(false)
    alert('로그아웃 되었습니다.')
    removeCookie('accessJwtToken:')
    Navigate('/')
  }, [])

  const menuClick = useCallback((e: React.MouseEvent) => {
    setOpen(true)
  }, [])
  const closeModal = useCallback((e: React.MouseEvent) => {
    setOpen(false)
  }, [])

  return (
    <>
      <header className="fixed z-20 w-full bg-mint lg:h-16 h-28 lg:before:h-0 before:h-10 before:w-full before:absolute before:bg-lightmint">
        <Div className="w-full">
          <Div className="absolute left-0 z-30 bottom-1 top-3 lg:-top-9 lg:left-1/2 lg:-translate-x-1/2">
            <Link to="/">
              <img src={navdog} alt="" className=" h-36" />
            </Link>
          </Div>
          <button
            className={`fixed right-0 z-40 hidden w-16 h-16 lg:block `}
            onClick={menuClick}>
            <Icon
              name="menu"
              className="w-full h-full text-white "
              style={{fontSize: '60px'}}></Icon>
          </button>

          <Div className="absolute right-0 top-2 lg:hidden">
            <ul className="flex">
              <li className="mr-4">
                <Link
                  to={islogin ? '/' : '/login'}
                  onClick={islogin ? logoutClick : () => {}}>
                  {islogin ? '로그아웃' : '로그인'}
                </Link>
              </li>
              <li className="mr-8">
                <Link to="/register">회원가입</Link>
              </li>
            </ul>
          </Div>

          <Div className="w-full">
            <Div className="absolute w-full h-16 top-11 lg:hidden">
              <ul className="flex items-center justify-center w-full h-full text-xl font-bold text-white">
                <li className="p-4 mr-8">
                  <Link to="/api/searchhospital">동물병원찾기</Link>
                </li>
                <li className="p-4 mr-8">
                  <Link to="/board/free">자랑하기</Link>
                </li>
                <li className="p-4 mr-8">
                  <Link to="/board/honey">꿀팁</Link>
                </li>
              </ul>
            </Div>
          </Div>
        </Div>
      </header>

      <div
        className={`fixed z-20 w-full h-screen ${
          open ? 'visible' : 'invisible'
        } bg-white lg:visible `}
        style={{
          transform: open ? 'translateY(0)' : 'translateY(-100%)', // 모달을 열 때는 위로 이동, 닫을 때는 화면 위쪽으로 이동하여 숨김
          // visibility: open ? 'visible' : 'hidden',
          // opacity: open ? 1 : 0, // 애니메이션 시작과 끝 값을 설정
          transition: '.3s ease-out' // 애니메이션 시간과 이징 함수 설정
        }}>
        <div className="z-30 w-full h-16 bg-white">
          <Div className="absolute left-0 top-3 lg:-top-9 lg:left-1/2 lg:-translate-x-1/2">
            <Link to="/" onClick={closeModal}>
              <img src={navdog} alt="" className=" h-36" />
            </Link>
          </Div>
          <button className="fixed right-0 z-40 w-16 h-16 lg:block" onClick={closeModal}>
            <Icon
              name="close"
              className="w-full h-full text-mint"
              style={{fontSize: '60px'}}></Icon>
          </button>
        </div>

        <div className="z-40 flex flex-col pt-16">
          <div>
            <ul className="flex justify-center">
              <li className="mr-4">
                <Link
                  to={islogin ? '/' : '/login'}
                  onClick={islogin ? logoutClick : closeModal}>
                  <Itemsummary>{islogin ? '로그아웃' : '로그인'}</Itemsummary>
                </Link>
              </li>
              <li className="">
                <Link to="/register" onClick={closeModal}>
                  <Itemsummary>회원가입</Itemsummary>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <ul>
              <li className="flex justify-center mt-4">
                <Link to="/api/searchhospital" onClick={closeModal}>
                  <Itemtitle>동물병원찾기</Itemtitle>
                </Link>
              </li>
              <li className="flex justify-center mt-4">
                <Link to="/board/free" onClick={closeModal}>
                  <Itemtitle>자랑하기</Itemtitle>
                </Link>
              </li>
              <li className="flex justify-center mt-4">
                <Link to="/board/honey" onClick={closeModal}>
                  <Itemtitle>꿀팁</Itemtitle>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
export default Nav
