import type {FC, MouseEventHandler} from 'react'
import {useState, useRef} from 'react'
import {Title, Subtitle, Loginbtn, Icon, LoginInput} from '../../components'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {setCookie, getCookie, removeCookie} from '../../util/Cookie'
import {useNavigate} from 'react-router-dom'
import {useSetRecoilState, useRecoilValue} from 'recoil'
import {isloginToken} from '../../store/RecoilAtom'

type LoginProps = {
  title?: string
}

export const Login: FC<LoginProps> = () => {
  // 기타 상수
  const JWT_EXPIRY_TIME = 10 * 600 * 1000 // 만료 시간 (밀리 초로 표현)
  // .withExpiresAt(new Date(System.currentTimeMillis()+1000*600*10)) // 토큰 유지시간

  // 사용자 입력 상태
  const userIdRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const navigate = useNavigate()
  //recoil 사용 선언부
  const setIslogin = useSetRecoilState(isloginToken)
  const islogin = useRecoilValue(isloginToken)

  const handleedSubmit = async () => {
    const userId = userIdRef.current?.value ?? ''
    const password = passwordRef.current?.value ?? ''
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        {
          userId: userId, // 아이디 정보 전송
          password: password // 비밀번호 정보 전송
        },
        {
          withCredentials: true // CORS를 사용하여 자격 증명 허용
        }
      )
      // response에서 Authorization 헤더 가져오기
      const jwtToken = response.headers.authorization
      if (jwtToken !== undefined && islogin === false) {
        setCookie('accessJwtToken: ', jwtToken) // 쿠키에 토큰 저장
        setTimeout(() => {
          removeCookie('accessJwtToken:')
          alert('토큰이 만료되어 로그아웃 되었습니다.')
        }, JWT_EXPIRY_TIME - 60000)
        alert('로그인 성공')
        setIslogin(true)
        navigate('/')
      } else {
        alert('로그인이 실패했습니다. 정보가 올바른지 다시 확인해주세요')
      }
    } catch (error) {
      console.error('Login failed:', error)
      alert('오류')
    }
  }

  return (
    <div className="flex flex-col items-center w-full h-screen m-auto bg-gray-100 grow pt-28 lg:pt-16">
      <div className="flex flex-col w-3/5 max-w-xl p-8 mt-16 bg-white rounded shadow-md h-1/2 min-w-max md:w-full md:h-3/4">
        <Subtitle className="p-4 mb-2 border-b-2">로그인</Subtitle>
        <div className="mt-4 mb-4">
          <LoginInput id="userId" type="text" placeholder="아이디" Inputref={userIdRef} />
        </div>
        <div className="mb-6">
          <LoginInput
            id="password"
            type="password"
            placeholder="비밀번호"
            Inputref={passwordRef}
          />
          <p className="text-xs italic text-red">Please choose a password.</p>
        </div>
        <div className="flex flex-col items-center justify-between">
          <Loginbtn name="Sign in" onClick={handleedSubmit}></Loginbtn>
          <Loginbtn name="구글 로그인"></Loginbtn>
          <div className="flex justify-around w-full ">
            <Link
              to="/register"
              className="inline-block text-sm font-bold text-center align-baseline grow border-x-2 border-x-mint text-blue hover:bg-slate-500 hover:text-white">
              회원가입
            </Link>
            <Link
              to="/"
              className="inline-block text-sm font-bold text-center align-baseline border-r-2 border-x-mint grow text-blue hover:bg-slate-500 hover:text-white">
              Forgot Password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
