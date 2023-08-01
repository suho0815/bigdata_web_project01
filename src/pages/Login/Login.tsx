import type {FC, MouseEventHandler} from 'react'
import {useRef} from 'react'
import {Title, Subtitle, Loginbtn, Icon, LoginInput} from '../../components'
import {Link} from 'react-router-dom'
import axios from 'axios'

type LoginProps = {
  title?: string
}

export const Login: FC<LoginProps> = () => {
  const userIdRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const JWT_EXPIRY_TIME = 24 * 3600 * 1000 // 만료 시간 (24시간 밀리 초로 표현)

  const onLogin: any = (userId: string, password: string) => {
    const data = {
      userId,
      password
    }
    axios
      .post('http://10.125.121.183:8080/login', data)
      .then(onLoginSuccess)
      .catch(error => {
        console.log(error)
        // ... 에러 처리
      })
  }

  const onSilentRefresh = (data: any) => {
    axios
      .post('http://10.125.121.183:8080/login', data)
      .then(onLoginSuccess)
      .catch(error => {
        console.log(error)
        // ... 로그인 실패 처리
      })
  }

  const onLoginSuccess = (response: any) => {
    const {accessToken} = response.data

    // accessToken 설정
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

    // accessToken 만료하기 1분 전에 로그인 연장
    setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000)
  }

  return (
    <div className="flex flex-col items-center w-full h-full m-auto bg-gray-100 grow pt-28 lg:pt-16">
      <div className="flex flex-col w-3/5 max-w-xl p-8 mt-16 bg-white rounded shadow-md h-1/2 min-w-max">
        <Subtitle className="p-4 mb-2 border-b-2">로그인</Subtitle>
        <div className="mt-4 mb-4">
          <LoginInput id="username" type="text" placeholder="아이디" ref={userIdRef} />
        </div>
        <div className="mb-6">
          <LoginInput
            id="password"
            type="password"
            placeholder="비밀번호"
            ref={passwordRef}
          />
          <p className="text-xs italic text-red">Please choose a password.</p>
        </div>
        <div className="flex flex-col items-center justify-between">
          <Loginbtn
            name="Sign in"
            onClick={onLogin(
              userIdRef.current !== null ? userIdRef.current.value : '',
              passwordRef.current !== null ? passwordRef.current.value : ''
            )}></Loginbtn>
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
