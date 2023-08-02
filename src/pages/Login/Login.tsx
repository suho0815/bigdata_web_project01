import type {FC, MouseEventHandler} from 'react'
import {useState, useRef} from 'react'
import {Title, Subtitle, Loginbtn, Icon, LoginInput} from '../../components'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {getCookie, setCookie, removeCookie} from './Cookie'
import AxiosC from './AxiosC'

type LoginProps = {
  title?: string
}

export const Login: FC<LoginProps> = () => {
  const userIdRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  // const [user, setUser] = useState({userId: '', password: ''})

  // const onChange = async (event: any) => {
  //   const {name, value} = event.target
  //   setUser({
  //     ...user,
  //     [name]: value
  //   })
  // }

  // const clickBtnLogin = async () => {
  //   const config = {
  //     method: 'post',
  //     url: 'http://10.125.121.183:8080/login',
  //     data: user
  //   }
  //   const {data} = await AxiosC(config)
  //   setCookie('accessToken', data.token)
  // }

  // /** Logout */
  // const clickBtnLogout = async () => {
  //   removeCookie('accessToken')
  // }

  const JWT_EXPIRY_TIME = 24 * 3600 * 1000 // 만료 시간 (24시간 밀리 초로 표현)

  const onLogin = (userId: string, password: string) => {
    const data = {
      userId,
      password
    }
    console.log('userId : ', userId)
    console.log('userPassword : ', password)
    let response = null
    try {
      response = axios
        .post('http://10.125.121.183:8080/login', data)
        .then(resp => onLoginSuccess(resp))
        .catch(error => {
          // ... 에러 처리
          // alert('에러')
          console.log('Error in login:', error)
          // onLoginSuccess(error.accessToken)
          if (error.response) {
            const {status, data} = error.response
            console.log('Error status:', status)
            console.log('Error data:', data)

            if (data && data.accessToken) {
              console.log('Access token in error response:', data.accessToken)
            }
          }
        })
    } catch (error: any) {
      response = error.response
      console.log('404 Error')
    } finally {
      if (response.status === 200) {
        onLoginSuccess(response)
      }
    }
  }

  const onSilentRefresh = (data: any) => {
    axios
      .post('http://10.125.121.183:8080/login', data)
      .then(response => onLoginSuccess(response))
      .catch(error => {
        console.log(error)
        // ... 로그인 실패 처리
        alert('아이디, 비밀번호가 틀렸음')
      })
  }

  const onLoginSuccess = (response: any) => {
    const {status, data} = response.data
    console.log(status)
    if (status === 'success' && data.accessToken) {
      const {accessToken} = data
      console.log('accessToken : ', accessToken)
      // accessToken 설정
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`

      // accessToken 만료하기 1분 전에 로그인 연장
      setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000)
    } else {
      // 서버 응답에 오류가 있을 경우 에러 처리
      console.log('Error in server response')
    }
  }

  return (
    <div className="flex flex-col items-center w-full h-full m-auto bg-gray-100 grow pt-28 lg:pt-16">
      <div className="flex flex-col w-3/5 max-w-xl p-8 mt-16 bg-white rounded shadow-md h-1/2 min-w-max">
        <Subtitle className="p-4 mb-2 border-b-2">로그인</Subtitle>
        <div className="mt-4 mb-4">
          <LoginInput
            id="username"
            type="text"
            placeholder="아이디"
            // onChange={onChange}
            Inputref={userIdRef}
          />
        </div>
        <div className="mb-6">
          <LoginInput
            id="password"
            type="password"
            placeholder="비밀번호"
            // onChange={onChange}
            Inputref={passwordRef}
          />
          <p className="text-xs italic text-red">Please choose a password.</p>
        </div>
        <div className="flex flex-col items-center justify-between">
          <Loginbtn
            name="Sign in"
            onClick={
              // clickBtnLogin
              () => {
                onLogin(
                  userIdRef.current !== null ? userIdRef.current.value : '',
                  passwordRef.current !== null ? passwordRef.current.value : ''
                )
              }
            }></Loginbtn>
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
