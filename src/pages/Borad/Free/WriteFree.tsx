import type {FC} from 'react'
import type {DivProps} from '../../../components'
import {Div, Subtitle} from '../../../components'

import BoardMenu from '../BoardMenu'
import {Link} from 'react-router-dom'

export type WriteFreeProps = DivProps & {
  isFree?: boolean
  title?: string
  content?: string
  imgsrc?: string
}

const WriteFree: FC<WriteFreeProps> = () => {
  const registerBtnClick = () => {}

  return (
    <Div className="mb-4">
      <BoardMenu />
      <Div className="flex flex-col items-center p-8 mt-8">
        <Div className="flex items-center justify-center w-full mt-8 border-y-2">
          <Subtitle className="mt-4 mb-4 mr-4">제목</Subtitle>
          <input type="text" className="w-2/5 mt-4 mb-4 input input-info" />
        </Div>
        <Div className="flex flex-col items-center w-full mt-4">
          <Div>내용</Div>
          <div className="w-4/5 mt-4 input input-info h-96" contentEditable="true"></div>
        </Div>
      </Div>

      <Div className="flex flex-col items-center">
        <input type="file" />
        <Div></Div>
      </Div>

      <Div className="flex justify-center p-4 m-4">
        <button className="mr-4 text-white btn btn-info">등록하기</button>
        <Link to="/board/free">
          <button className="btn ">취소</button>
        </Link>
      </Div>
    </Div>
  )
}

export default WriteFree
