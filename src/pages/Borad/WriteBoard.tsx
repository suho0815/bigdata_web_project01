import type {FC} from 'react'
import type {DivProps} from '../../components'
import {Div, Subtitle} from '../../components'
import {useRef, useState, useEffect} from 'react'
import dog from '../../images/nav-dog.png'

import BoardMenu from './BoardMenu'
import {Link, useParams} from 'react-router-dom'

export type WriteBoardProps = DivProps & {
  isFree?: boolean
  title?: string
  content?: string
  imgsrc?: string
}

const WriteBoard: FC<WriteBoardProps> = () => {
  const Params = useParams()['itmes']
  console.log(Params)
  const [imgFile, setImgFile] = useState<string>('')
  const titleRef = useRef<HTMLInputElement | null>(null)
  const contentRef = useRef<HTMLInputElement | null>(null)
  const imgRef = useRef<HTMLInputElement | null>(null)

  const saveImgFile = () => {
    // if (imgRef.current?.files !== null) {
    const file = imgRef.current?.files?.[0]
    console.log('file: ', file)
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file) // 파일을 url로 만들기 파일 정보를 주소처럼 사용
      reader.onloadend = () => {
        // 파일을 읽는 작업이 완료 되었을 때 이벤트
        const result = reader.result
        if (typeof result === 'string') {
          setImgFile(result)
        }
      }
    }
    // }
  }

  // useEffect(() => {
  //   console.log(imgRef.current)
  //   console.log(imgFile)
  // }, [imgRef])

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
        <input
          type="file"
          accept="image/*"
          id="Img"
          ref={imgRef}
          onChange={saveImgFile}
        />
        <Div className="mt-4">
          <img src={imgFile ? imgFile : dog} alt="이미지" />
        </Div>
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

export default WriteBoard
