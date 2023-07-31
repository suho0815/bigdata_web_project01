import type {FC} from 'react'
import {Title, Subtitle, Loginbtn, Icon, LoginInput} from '../../components'
import {Link} from 'react-router-dom'

type LoginProps = {
  title?: string
}

export const Login: FC<LoginProps> = () => {
  return (
    <div className="flex flex-col items-center w-full h-full m-auto bg-gray-100 grow pt-28 lg:pt-16">
      <div className="flex flex-col w-3/5 max-w-xl p-8 mt-16 bg-white rounded shadow-md h-1/2 min-w-max">
        <Subtitle className="p-4 mb-2 border-b-2">로그인</Subtitle>
        <div className="mt-4 mb-4">
          <LoginInput id="username" type="text" placeholder="아이디" />
        </div>
        <div className="mb-6">
          <LoginInput id="password" type="password" placeholder="비밀번호" />
          <p className="text-xs italic text-red">Please choose a password.</p>
        </div>
        <div className="flex flex-col items-center justify-between">
          <Loginbtn name="Sign in"></Loginbtn>
          <Loginbtn name="구글 로그인"></Loginbtn>
          <div className="flex justify-around w-full ">
            <Link
              to="/join"
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
