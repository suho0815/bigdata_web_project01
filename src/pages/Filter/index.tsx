import type {FC} from 'react'
import {useRef} from 'react'
import {Icon} from '../../components/Icon'

const Filter = () => {
  return (
    <div className="flex justify-around w-full h-1/6 ">
      <header>
        <div className="font-bold text-3xl">Title</div>
      </header>

      <div>
        <input type="text" className="input input-primary input-sm" placeholder="검색" />
        <span className="mt-8">
          <Icon
            name="search"
            className=" p-2 btn-primary btn-sm rounded-xl text-center items-center"></Icon>
        </span>
      </div>

      <div>
        <button className="btn btn-primary">상세 검색</button>
      </div>
    </div>
  )
}
export default Filter
