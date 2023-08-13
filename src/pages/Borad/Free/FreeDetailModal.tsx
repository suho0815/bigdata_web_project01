import React, {FC, useEffect, useState, useRef} from 'react'
import {
  DivProps,
  Subtitle,
  Icon,
  Itemsummary,
  Itemtitle,
  Modal,
  ModalContent,
  ModalAction
} from '../../../components'
import {Div} from '../../../components'
import FreeDetailReply from './FreeDetailReply'
import ReplyInput from './ReplyInput'
import {getCookie, getUserInfoFromToken} from '../../../util'
import choco3 from '../../../images/choco3.jpg'

export type FreeDetailModalProps = DivProps & {
  onCloseIconClick?: () => void
  title?: string
  freeBoardId?: number
  heart?: number
}

//게시글번호(string), "free"
const FreeDetailModal: FC<FreeDetailModalProps> = ({
  onCloseIconClick,
  title,
  freeBoardId,
  heart
}) => {
  const [userInfoTrue, setUserInfoTrue] = useState<boolean>(false)
  const [modalData, setModalData] = useState<any>()
  const [modalReplyData, setModalReplyData] = useState<any[]>()
  const [forceUpdate, setforceUpdate] = useState<any>() // 빈 상태로 사용 강제 재렌더링용,,ㅠ

  // 헤더 및 유저정보
  const userInfo = getUserInfoFromToken()
  const token = getCookie('accessJwtToken:')
  const headers = new Headers()
  headers.append('Authorization', token)
  headers.append('Content-Type', 'application/json')

  // 게시글 내용 가져오기
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/free/${title}`, {
      method: 'GET',
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        if (userInfo !== undefined && setUserInfoTrue) {
          if (userInfo === data['userId']) {
            setUserInfoTrue(true)
          } else if (userInfo !== data['userId']) {
            setUserInfoTrue(false)
          }
        }
        setModalData(data)
      })
      .catch(error => error.message)
  }, [title])

  // 모달창이 열리면 게시글의 댓글 내용 가져오기
  useEffect(() => {
    if (modalData) {
      fetchReplyData()
    }
  }, [modalData, forceUpdate])

  // 게시글 댓글 내용 가져오는 함수
  const fetchReplyData = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/freeReply`, {
      method: 'GET',
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        const replyDatafilter = data.filter(
          (datalist: any) =>
            datalist['freeBoardId']['freeBoardId'] === modalData['freeBoardId']
        )
        const replyData = replyDatafilter.map((datalist: any, index: number) => (
          <FreeDetailReply
            key={index}
            contents={datalist['contents']}
            nickname={datalist['nickname']}
            userId={datalist['userId']}
            registrationDate={datalist['registrationDate']}
            commentId={datalist['commentId']}
            setforceUpdate={setforceUpdate}
          />
        ))
        setModalReplyData(replyData)
        // console.log(replyData) // 새로 업데이트된 댓글 데이터 출력
      })
      .catch(error => error.message)
  }

  // 좋아요 버튼 클릭 시
  const likeOnClick = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/like/${title}/${freeBoardId}`, {
      method: 'POST',
      headers: headers
    })
      .then(response => response.text())
      .then(data => {
        console.log(data)
        console.log(heart)
      })
      .catch(error => error.message)
  }

  // 게시글 삭제
  const deleteFreeBoard = () => {
    if (userInfoTrue) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/free/${freeBoardId}`, {
        method: 'DELETE',
        headers: headers
      }).catch(error => error.message)
      if (onCloseIconClick && typeof onCloseIconClick === 'function') onCloseIconClick()
      alert('게시글이 삭제되었습니다.')
    }
  }

  return (
    <Modal open={true}>
      <ModalContent
        className="flex max-w-5xl h-1/2 md:flex-col md:h-4/5"
        onCloseIconClicked={onCloseIconClick}>
        <div className="w-1/2 mt-6 text-center md:w-full md:h-1/2">
          <img src={choco3} alt="" className="object-cover w-full h-full" />
        </div>
        <div className="w-1/2 md:w-full md:h-full">
          <ModalAction className="flex flex-col h-full p-4 mt-2">
            <div className="flex items-center justify-between p-2 px-4 h-1/6">
              <Itemtitle className="flex justify-center">
                <Icon name="person" />
                {modalData ? modalData['nickname'] : ''}
              </Itemtitle>
              <div className="flex items-center justify-center">
                <div
                  className="flex items-center mr-4 cursor-pointer "
                  onClick={likeOnClick}>
                  <Icon name="favorite" className="mr-1 hover:animate-ping" />
                  {heart}
                </div>
                <div className="flex items-center mr-4">
                  <Icon name="chat_bubble" className="mr-1" />
                  {modalReplyData?.length}
                </div>
                {userInfoTrue && modalData && (
                  <Div className="flex">
                    <button className="mr-3 btn btn-md">수정</button>
                    <button
                      className="text-white btn btn-md btn-error"
                      onClick={deleteFreeBoard}>
                      삭제
                    </button>
                  </Div>
                )}
              </div>
            </div>
            <div className="w-full overflow-y-auto border-t-2 h-4/6 md:h-full">
              <div className="w-full py-2 ">
                <div className="flex w-full pb-2">
                  <Itemtitle className="w-2/3 text-start">
                    {modalData ? modalData['title'] : ''}
                  </Itemtitle>
                  <Itemsummary className="w-1/3">
                    작성일{' '}
                    {modalData && modalData['regdate'] !== null
                      ? modalData['regdate'].slice(0, 10)
                      : ''}
                  </Itemsummary>
                </div>
                <div>{modalData ? modalData['content'] : ''}</div>
              </div>
              <div className="py-2 border-y-2">{modalReplyData}</div>
            </div>
            <ReplyInput
              freeBoardId={modalData ? modalData['freeBoardId'] : ''}
              fetchReplyData={fetchReplyData}
            />
          </ModalAction>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default FreeDetailModal
