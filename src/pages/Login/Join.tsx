import type {FC, ChangeEvent} from 'react'
import {useCallback, useState, useRef} from 'react'
import {Div, Subtitle, LoginInput, Loginbtn, Itemtitle} from '../../components'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

type JoinProps = {
  title?: string
}

export const Join: FC<JoinProps> = () => {
  const Navigate = useNavigate()
  const password = useRef<HTMLInputElement | null>(null)
  const passwordcheck = useRef<HTMLInputElement | null>(null)
  const [passwordTrue, setPasswordTrue] = useState<boolean | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    password: '',
    nickname: '',
    mobilePhone: '',
    email: '',
    address: ''
  })

  const onSubmitClick = () => {
    console.log(formData)
    if (
      (formData.name,
      formData.userId,
      formData.password,
      formData.nickname,
      formData.mobilePhone !== '')
    ) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/register`, {
          name: formData.name,
          userId: formData.userId,
          password: formData.password,
          nickname: formData.nickname,
          email: formData.email,
          mobilePhone: formData.mobilePhone,
          address: formData.address
        })
        .then(response => {
          alert(response.data)
          Navigate('/login')
        })
        .catch(err => alert('회원가입 실패'))
    } else {
      alert('필수 항목을 입력해주세요.')
    }
  }

  const handleInputChange = (event: any) => {
    const {id, value} = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }))
    if (id === 'password') {
      if (passwordcheck.current?.value === '' && value === '') setPasswordTrue(null)
      else if (value === passwordcheck.current?.value) setPasswordTrue(true)
      else setPasswordTrue(false)
    }
  }

  const passwordCheckChange = (event: any) => {
    const value = event.target
    if (password.current?.value === '' && value.value === '') setPasswordTrue(null)
    else if (password.current?.value === value.value) setPasswordTrue(true)
    else setPasswordTrue(false)
  }

  return (
    <div className="flex flex-col items-center w-full h-full m-auto bg-gray-100 grow pt-28 lg:pt-16">
      <div className="flex flex-col w-3/5 max-w-xl p-8 mt-16 mb-8 bg-white rounded shadow-md h-4/5 md:w-full md:h-full">
        <Subtitle className="p-4 mb-2 border-b-2">회원가입</Subtitle>
        <Itemtitle className="text-left">*필수</Itemtitle>
        <Div>
          <div className="mt-4">
            <LoginInput
              id="name"
              type="text"
              placeholder="이름"
              onChange={handleInputChange}
            />
            <LoginInput
              id="nickname"
              type="nickname"
              placeholder="닉네임"
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4 mb-4">
            <LoginInput
              id="userId"
              type="text"
              placeholder="아이디"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-6">
            <LoginInput
              id="password"
              type="password"
              placeholder="비밀번호"
              Inputref={password}
              onChange={handleInputChange}
            />
            <LoginInput
              id="passwordcheck"
              type="password"
              Inputref={passwordcheck}
              placeholder="비밀번호 확인"
              onChange={passwordCheckChange}
            />

            {passwordTrue ? (
              <div className="px-6 py-4 text-blue-500 rounded-lg bg-blue-50">
                <span className="font-bold">비밀번호가 일치함</span>
              </div>
            ) : passwordTrue === null ? (
              <div className="px-6 py-4 text-gray-700 bg-gray-100 rounded-lg">
                <span className="font-bold">비밀번호 입력하셈</span>
              </div>
            ) : (
              <div className="px-6 py-4 text-yellow-600 rounded-lg bg-yellow-50">
                <span className="font-bold">비밀번호가 맞지 않음</span>
              </div>
            )}
          </div>
          <div className="mb-4">
            <LoginInput
              id="mobilePhone"
              type="mobilePhone"
              placeholder="폰 번호"
              onChange={handleInputChange}
            />
          </div>
          <Itemtitle>선택</Itemtitle>
          <Div className="mt-4 mb-4">
            <LoginInput
              id="email"
              type="email"
              placeholder="이메일"
              onChange={handleInputChange}
            />
            <LoginInput
              id="address"
              type="address"
              placeholder="주소"
              onChange={handleInputChange}
            />
          </Div>
        </Div>
        <div className="flex flex-col pt-12">
          <Loginbtn name="가입하기" onClick={onSubmitClick}></Loginbtn>
        </div>
      </div>
    </div>
  )
}
