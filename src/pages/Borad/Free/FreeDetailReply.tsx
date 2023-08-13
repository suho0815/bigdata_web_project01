import type {FC} from 'react'
import type {DivProps} from '../../../components'
import {Div, Icon, Itemtitle, Itemsummary} from '../../../components'
import {getCookie, getUserInfoFromToken} from '../../../util'
import {useState, useEffect, useRef} from 'react'

export type FreeDetailReplyProps = DivProps & {
  contents?: string
  nickname?: string
  userId?: string
  registrationDate?: string
  commentId?: number
  setforceUpdate: React.Dispatch<React.SetStateAction<any>>
}
// 댓글 내용 보여주는 컴포넌트
const FreeDetailReply: FC<FreeDetailReplyProps> = ({
  contents,
  nickname,
  userId,
  registrationDate,
  commentId,
  setforceUpdate
}) => {
  const [userInfoTrue, setUserInfoTrue] = useState<boolean>(false)
  const [updateReplybtn, setUpdateReplybtn] = useState<boolean>(false)
  const updateInputRef = useRef<HTMLInputElement>(null)

  const userInfo: string = getUserInfoFromToken()
  const token = getCookie('accessJwtToken:')
  const headers = new Headers()
  headers.append('Authorization', token)
  headers.append('Content-Type', 'application/json')

  useEffect(() => {
    if (userInfo !== undefined && setUserInfoTrue) {
      if (userInfo === userId) {
        setUserInfoTrue(true)
      } else if (userInfo !== userId) {
        setUserInfoTrue(false)
      }
    }
  }, [userId, userInfo])

  const updateReplyFetchClicked = () => {
    if (userInfoTrue) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/freeReply/${commentId}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({
          contents: updateInputRef.current ? updateInputRef.current.value : ''
        })
      })
        .then(response => response.text())
        .then(data => {
          console.log(data)
        })
        .catch(error => error.message)
    }
    setUpdateReplybtn(false)
    setforceUpdate(updateInputRef.current ? updateInputRef.current.value : '')
  }

  const deleteReplyClicked = () => {
    if (userInfoTrue) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/freeReply/${commentId}`, {
        method: 'DELETE',
        headers: headers
      })
        .then(response => response.text())
        .then(data => {
          console.log(data)
          setforceUpdate(true ? false : true)
        })
        .catch(error => error.message)
    }
  }

  return (
    <Div className="py-1">
      <Div className="flex justify-between">
        <Itemtitle className="flex items-center">
          <Icon name="person" />
          {nickname}
        </Itemtitle>
        <Div className="flex items-center mr-2">
          <Itemsummary className="mr-2">
            작성 일 {registrationDate?.slice(0, 10)}
          </Itemsummary>
          {userInfoTrue && (
            <div className="flex items-center">
              <button className="mr-2 btn btn-sm" onClick={() => setUpdateReplybtn(true)}>
                수정
              </button>
              <button className="text-sm" onClick={deleteReplyClicked}>
                <Icon name="close" />
              </button>
            </div>
          )}
        </Div>
      </Div>
      <Div className="w-full">
        {updateReplybtn ? (
          <Div className="flex justify-between w-full my-2">
            <input
              type="text"
              ref={updateInputRef}
              defaultValue={contents}
              className="w-full mx-2 input input-info input-sm"
            />
            <button
              className="mr-2 text-white btn btn-sm btn-info"
              onClick={updateReplyFetchClicked}>
              등록
            </button>
          </Div>
        ) : (
          contents
        )}
      </Div>
    </Div>
  )
}

export default FreeDetailReply
