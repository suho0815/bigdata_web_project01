import type {FC} from 'react'
import type {DivProps} from '../../../components'
import {useState, useRef, useEffect} from 'react'
import {Div, Icon, Itemtitle, Itemsummary} from '../../../components'
import {getCookie, getUserInfoFromToken} from '../../../util'

export type HoneyDetailReplyProps = DivProps & {
  contents?: string
  writer?: string
  regdate?: string
  commentId?: number
  userId?: string
  GetReplyList?: () => void
}

const HoneyDetailReply: FC<HoneyDetailReplyProps> = ({
  contents,
  writer,
  regdate,
  commentId,
  userId,
  GetReplyList
}) => {
  const updateReplyRef = useRef<HTMLInputElement>(null)
  const [updateInputOpen, setUpdateInputOpen] = useState<boolean>(false)
  const [userInfoTrue, setUserInfoTrue] = useState<boolean>(false)

  const userInfo: string = getUserInfoFromToken()
  const token = getCookie('accessJwtToken:')
  const headers = new Headers()
  headers.append('Authorization', token)
  headers.append('Content-Type', 'application/json')

  useEffect(() => {
    // console.log('userId', userId)
    // console.log('userInfo', userInfo)
    if (userInfo === userId) setUserInfoTrue(true)
    else setUserInfoTrue(false)
  }, [])

  // 댓글 수정
  const updateReplyClicked = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/honeyReply/${commentId}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        contents: updateReplyRef.current ? updateReplyRef.current.value : contents
      })
    })
      .then(response => response.text())
      .then(data => {
        console.log(data)
        if (GetReplyList) GetReplyList()
      })
      .catch(error => error.message)
    setUpdateInputOpen(false)
  }

  // 댓글 삭제
  const deleteReplyClicked = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/honeyReply/${commentId}`, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify({}) // 빈 객체를 요청 본문으로 전달
    })
      .then(response => response.text())
      .then(data => {
        console.log(data)
        if (GetReplyList) GetReplyList()
      })
      .catch(error => error.message)
  }
  return (
    <Div className="flex flex-col w-full border-2 h-28">
      <Div className="flex justify-between mt-2">
        <Div>
          <Itemtitle className="flex items-center ml-4">
            <Icon name="person" />
            {writer}
          </Itemtitle>
        </Div>
        <Div className="flex items-center">
          {/*  */}
          <Itemsummary className="mr-4">작성 일: {regdate?.slice(0, 10)}</Itemsummary>
          {userInfoTrue && (
            <Div className="">
              <button
                className="mr-2 btn btn-sm"
                onClick={() => setUpdateInputOpen(true)}>
                수정
              </button>
              <button
                className="mr-2 align-middle btn btn-sm"
                onClick={deleteReplyClicked}>
                <Icon name="close" />
              </button>
            </Div>
          )}
        </Div>
      </Div>
      <Div className="mt-3 ml-2">
        {updateInputOpen ? (
          <Div className="flex justify-between w-full ">
            <input
              type="text"
              className="w-2/3 input input-xm input-info"
              ref={updateReplyRef}
              defaultValue={contents}
            />
            <Div className="flex justify-end w-1/3">
              <button
                className="mr-2 text-white btn btn-xm btn-info"
                onClick={updateReplyClicked}>
                등록
              </button>
              <button
                className="mr-2 btn btn-xm"
                onClick={() => setUpdateInputOpen(false)}>
                취소
              </button>
            </Div>
          </Div>
        ) : (
          contents
        )}
      </Div>
    </Div>
  )
}

export default HoneyDetailReply
