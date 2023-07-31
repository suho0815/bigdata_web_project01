import type {FC} from 'react'
import {Div, Subtitle, LoginInput, Loginbtn, Itemtitle} from '../../components'
import {Link} from 'react-router-dom'

type JoinProps = {
  title?: string
}

export const Join: FC<JoinProps> = () => {
  return (
    <div className="flex flex-col items-center w-full h-full m-auto bg-gray-100 grow pt-28 lg:pt-16">
      <div className="flex flex-col w-3/5 max-w-xl p-8 mt-16 bg-white rounded shadow-md h-1/2 min-w-max">
        <Subtitle className="p-4 mb-2 border-b-2">회원가입</Subtitle>
        <Itemtitle>*필수</Itemtitle>
        <Div>
          <div className="mt-4">
            <LoginInput id="username" type="text" placeholder="이름" />
            <LoginInput id="username" type="text" placeholder="닉네임" />
          </div>
          <div className="mt-4 mb-4">
            <LoginInput id="username" type="text" placeholder="아이디" />
          </div>
          <div className="mb-6">
            <LoginInput id="password" type="password" placeholder="비밀번호" />
            <LoginInput id="password" type="password" placeholder="비밀번호 확인" />
            <p className="text-xs italic text-red">Please choose a password.</p>
          </div>
        </Div>
        <Itemtitle>선택</Itemtitle>
        <Div></Div>
        <div className="flex flex-col items-center justify-between">
          <Loginbtn name="가입하기"></Loginbtn>
        </div>
      </div>
    </div>
  )
}
