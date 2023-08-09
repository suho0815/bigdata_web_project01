import type {FC, ChangeEvent} from 'react'
import {useCallback, useState, useRef} from 'react'
import {Div, Subtitle, LoginInput, Loginbtn, Itemtitle} from '../../components'
import {Link} from 'react-router-dom'
import axios from 'axios'

type JoinProps = {
  title?: string
}

export const Join: FC<JoinProps> = () => {
  const url = 'http://10.125.121.183:8080/register'

  const passwordcheck = useRef<HTMLInputElement | null>(null)
  const [passwordTrue, setPasswordTrue] = useState<boolean>()
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
    axios
      .post(url, {
        name: formData.name,
        userId: formData.userId,
        password: formData.password,
        nickname: formData.nickname,
        email: formData.email,
        mobilePhone: formData.mobilePhone,
        address: formData.address
      })
      .then(response => console.log(response.data))
      .catch(err => console.error(err.message))
  }

  const handleInputChange = (event: any) => {
    const {id, value} = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [id]: value
    }))
    if (formData.password !== passwordcheck.current?.value) {
      setPasswordTrue(false)
    } else setPasswordTrue(true)
  }

  return (
    <div className="flex flex-col items-center w-full h-screen m-auto bg-gray-100 grow pt-28 lg:pt-16 md:h-full">
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
              onChange={handleInputChange}
            />
            <LoginInput
              id="passwordcheck"
              type="password"
              Inputref={passwordcheck}
              placeholder="비밀번호 확인"
            />
            <p className="text-xs italic text-red">Please choose a password.</p>
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
