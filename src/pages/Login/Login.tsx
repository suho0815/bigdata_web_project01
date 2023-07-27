import type {FC} from 'react'
import {Title, Subtitle} from '../../components'

type LoginProps = {
  title?: string
}

export const Login: FC<LoginProps> = () => {
  return (
    <div className="flex flex-col items-center w-full h-full m-auto bg-gray-100 grow">
      <div className="flex flex-col w-2/5 max-w-xl p-8 mt-16 bg-white rounded shadow-md h-1/2 min-w-max">
        <Subtitle className="p-4 mb-2 border-b-2">로그인</Subtitle>
        <div className="mt-4 mb-4">
          <label className="block mb-2 text-sm font-bold" htmlFor="username">
            Username
          </label>
          <input
            className="w-full px-3 py-2 border rounded shadow appearance-none"
            id="username"
            type="text"
            placeholder="아이디"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 mb-3 border rounded shadow appearance-none"
            id="password"
            type="password"
            placeholder="비밀번호"
          />
          <p className="text-xs italic text-red">Please choose a password.</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-slate-500"
            type="button">
            Sign In
          </button>
          <a
            className="inline-block text-sm font-bold align-baseline text-blue hover:bg-slate-500 hover:text-white"
            href="#">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  )
}
