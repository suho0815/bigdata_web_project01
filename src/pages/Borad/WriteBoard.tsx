import type {FC} from 'react'
import type {DivProps} from '../../components'
import {Div, Subtitle} from '../../components'
import {useRef, useState, useEffect} from 'react'
import dog from '../../images/nav-dog.png'

import BoardMenu from './BoardMenu'
import {Link, useParams, useNavigate, useLocation} from 'react-router-dom'
import {useSetRecoilState, useRecoilValue} from 'recoil'
import {isFree} from '../../store/RecoilAtom'
import {getCookie} from '../../util'

export type WriteBoardProps = DivProps & {
  isFree?: boolean
  title?: string
  content?: string
  imgsrc?: string
  boardId?: number
}

const WriteBoard: FC<WriteBoardProps> = () => {
  const Params = useParams()['itmes']
  const location = useLocation()
  const Navigate = useNavigate()
  console.log(location.state?.modalData)

  const [imgFile, setImgFile] = useState<string>('')
  const titleRef = useRef<HTMLInputElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const imgRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (location.state) {
      const updateData = location.state?.modalData
      if (titleRef.current) titleRef.current.value = updateData['title']
    }
  }, [])

  // 이미지 미리보기
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

  // 등록하기 버튼 클릭 시
  const registerBtnClick = async () => {
    const formData = new FormData()
    const titleValue = titleRef.current ? titleRef.current.value : ' '
    const contentValue = contentRef.current ? contentRef.current.textContent : ' '
    formData.append('title', titleValue)
    if (contentValue !== null) {
      formData.append('content', contentValue)
    }
    const imageFile = imgRef.current?.files?.[0]
    if (imageFile) {
      formData.append('imageFile', imageFile)
    }

    for (const keyValue of formData) console.log(keyValue)
    console.log(formData.get('imageFile'))

    const tokenCookie = getCookie('accessJwtToken:')
    if (tokenCookie) {
      const token = tokenCookie.trim()

      const headers = new Headers()
      headers.append('Authorization', token)
      // headers.append('Content-Type', 'multipart/form-data')
      // headers.append('Content-Type', 'application/json')
      try {
        console.log(`${process.env.REACT_APP_SERVER_URL}/${Params}`)
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/${Params}`, {
          method: 'POST',
          headers: headers,
          body: formData
        })
        if (response.ok) {
          const data = await response.text()
          console.log(data)
        } else {
          throw new Error('Network response was not ok')
        }
      } catch (err) {
        console.error((err as Error).message)
      }
      Navigate(`/board/${Params}`)
      //   fetch(`${process.env.REACT_APP_SERVER_URL}/${Params}/${boardId}`, {
      //     method: 'PUT',
      //     headers: headers,
      //     body: formData
      //   })
      //     .then(response => {
      //       if (response.ok) {
      //         console.log(response.json())
      //         return response.json()
      //       } else {
      //         throw new Error('Network response was not ok')
      //       }
      //     })
      //     .then(data => console.log(data))
      //     .catch(err => err.message)
      // } else {
      //   alert('로그인이 필요한 서비스입니다.')
      // }
    }
  }

  return (
    <Div className="mb-4">
      <BoardMenu />
      <Div className="flex flex-col items-center p-8 mt-8">
        <Div className="flex items-center justify-center w-full mt-8 border-y-2">
          <Subtitle className="mt-4 mb-4 mr-4">제목</Subtitle>
          <input
            type="text"
            className="w-2/5 mt-4 mb-4 input input-info"
            ref={titleRef}
            // defaultValue={location}
          />
        </Div>
        <Div className="flex flex-col items-center w-full mt-4">
          <Div>내용</Div>
          <div
            className="w-4/5 mt-4 input input-info h-96"
            contentEditable="true"
            ref={contentRef}></div>
        </Div>
      </Div>

      <Div className="flex flex-col items-center">
        <input
          type="file"
          multiple
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
        <button className="mr-4 text-white btn btn-info" onClick={registerBtnClick}>
          등록하기
        </button>
        <Link to={`/board/${Params}`}>
          <button className="btn ">취소</button>
        </Link>
      </Div>
    </Div>
  )
}

export default WriteBoard
