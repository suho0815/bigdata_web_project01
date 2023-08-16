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
          <button className="flex items-center justify-center w-full px-4 py-2 mb-3 text-sm font-medium text-indigo-500 uppercase bg-gray-200 border rounded shadow-md hover:bg-gray-300 hover:text-gray-700 hover:shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mr-3"
              viewBox="0 0 48 48">
              <path
                fill="#fbc02d"
                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
              />
              <path
                fill="#e53935"
                d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
              />
              <path
                fill="#4caf50"
                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
              />
              <path
                fill="#1565c0"
                d="M43.611 20.083 43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
              />
            </svg>
            Google
          </button>
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
