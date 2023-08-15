import type {FC} from 'react'
import {Div, type DivProps} from '../../../components'
import {useRef} from 'react'
import {getCookie} from '../../../util'

export type ReplyInputProps = DivProps & {
  freeBoardId?: number
  fetchReplyData?: () => void
}

const ReplyInput: FC<ReplyInputProps> = ({freeBoardId, fetchReplyData}) => {
  const replyContentsRef = useRef<HTMLTextAreaElement>(null)

  const replyonClick = () => {
    console.log(replyContentsRef.current ? replyContentsRef.current.value : '')
    const token = getCookie('accessJwtToken:')
    const headers = new Headers()
    headers.append('Authorization', token)
    headers.append('Content-Type', 'application/json')
    fetch(`${process.env.REACT_APP_SERVER_URL}/freeReply/${freeBoardId}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        contents: replyContentsRef.current ? replyContentsRef.current.value : ''
      })
    })
      .then(response => response.text())
      .then(data => {
        console.log(data)
        fetchReplyData && fetchReplyData()
        if (replyContentsRef.current) {
          replyContentsRef.current.value = ''
        }
      })
      .catch(error => error.message)
  }

  return (
    <Div className="flex pb-2 mt-4 h-1/6">
      <textarea
        id=""
        className="w-5/6 mr-4 border-2 resize-none border-stone-400 focus:border-red-200 outline-0"
        placeholder="댓글 내용 작성하셈"
        ref={replyContentsRef}></textarea>
      <button
        className="w-1/6 p-4 px-6 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl "
        onClick={replyonClick}>
        등록
      </button>
    </Div>
  )
}

export default ReplyInput
