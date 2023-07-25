import type {FC} from 'react'
import {useRef} from 'react'
import {Icon, Div} from '../../components'

const Filter = () => {
  return (
    <Div className="flex justify-around w-full items-center border" height="10%">
      <header className="w-1/3">
        <div className="font-bold text-3xl ml-4">Title</div>
      </header>

      <div className="w-1/3">
        <div className="flex bg-gray-200 rounded-xl p-2 w-full">
          <input
            type="text"
            className="p-2 bg-gray-200 rounded-xl w-11/12"
            placeholder=" 검색"
          />
          <Icon name="search" className="p-2 ml-4 rounded-xl w-1/12"></Icon>
        </div>
      </div>

      <div className="flex justify-evenly w-1/3">
        <button className="btn btn-primary">상세 검색</button>
        <div>
          <button className="btn ">로그인</button>
          <button className="btn ml-6">회원가입</button>
        </div>
      </div>
    </Div>
  )
}
export default Filter
