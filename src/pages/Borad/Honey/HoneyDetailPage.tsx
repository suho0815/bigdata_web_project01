import type {FC} from 'react'
import type {HoneyData} from './index'
import {useEffect, useState, useRef} from 'react'
import {Div, Subtitle, Icon, Itemsummary, Itemtitle} from '../../../components'
import {useNavigate} from 'react-router-dom'
import {getCookie, getUserInfoFromToken} from '../../../util'
import HoneyDetailReply from './HoneyDetailReply'

export type HoneyDetailPage = HoneyData & {
  honeyBoardId?: number
  content?: string
  userId?: string
  imagefile?: string
  setBoardListTrue?: (value: React.SetStateAction<boolean>) => void //MouseEventHandler<HTMLButtonElement>
  setHeartBtnCheck?: any //React.Dispatch<React.SetStateAction<boolean>>
}

const HoneyDetailPage: FC<HoneyDetailPage> = ({
  title,
  nickname,
  regdate,
  views,
  heart,
  content,
  honeyBoardId,
  userId,
  imagefile,
  setBoardListTrue,
  setHeartBtnCheck
}) => {
  const Navigate = useNavigate()
  const replyContentsRef = useRef<HTMLTextAreaElement | null>(null)
  const [replyData, setReplyData] = useState<any>()
  const [heartState, setHeartState] = useState<number>()
  const [total, setTotal] = useState<number>()
  const [userInfoTrue, setUserInfoTrue] = useState<boolean>(false)
  const [focusUpdate, setForceUpdate] = useState<any>()

  const userInfo = getUserInfoFromToken()
  const tokenCookie = getCookie('accessJwtToken:')
  const token = tokenCookie?.trim()
  const headers = new Headers()
  headers.append('Authorization', token)
  headers.append('Content-Type', 'application/json')
  //게시글번호(string), "honey"

  //좋아요 버튼 클릭 시
  const likeOnClick = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/like/${title}/${honeyBoardId}`, {
      method: 'GET',
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        console.log(heart)
        setHeartBtnCheck(true)
        setHeartState(heart)
      })
      .catch(error => error.message)
  }

  // 게시글 수정버튼 클릭 시
  const updateOnClick = () => {
    Navigate('/board/honey/write', {
      state: {
        title: title,
        content: content,
        imagefile: imagefile
      }
    })
    // fetch(`${process.env.REACT_APP_SERVER_URL}/honey/${honeyBoardId}`, {
    //   method: 'PUT',
    //   headers: headers
    // })
    //   .then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => error.message)
  }

  // 게시글 삭제버튼 클릭 시
  const deleteOnClick = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/honey/${honeyBoardId}`, {
      method: 'DELETE',
      headers: headers
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => error.message)
    if (setBoardListTrue !== undefined) setBoardListTrue(false)
  }

  // 댓글 등록버튼 클릭 시
  const replyonClick = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/honeyReply/${honeyBoardId}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        contents: replyContentsRef.current?.value
      })
    })
      .then(response => response.text())
      .then(data => {
        console.log(data)
        GetReplyList()

        if (replyContentsRef.current) {
          replyContentsRef.current.value = ''
        }
      })
      .catch(error => error.message)
    // if (setForceUpdate) setForceUpdate(replyContentsRef.current?.value)
    // GetReplyList()
  }

  // 댓글 리스트 띄우기
  const GetReplyList = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/honeyReply`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        const filterdata = data.filter(
          (datalist: any) => honeyBoardId === datalist['honeyBoardId']['honeyBoardId']
        )
        const replydata = filterdata.map((datalist: any, index: number) => (
          <HoneyDetailReply
            key={index}
            contents={datalist['contents']}
            writer={datalist['nickname']}
            regdate={datalist['registrationDate']}
            commentId={datalist['commentId']}
            userId={datalist['userId']}
            GetReplyList={GetReplyList}
          />
        ))
        setReplyData(replydata)
        setTotal(replydata.length)
      })
      .catch(error => error.message)
  }
  useEffect(() => {
    if (userInfo === userId) setUserInfoTrue(true)
    else setUserInfoTrue(false)
  }, [])

  useEffect(() => {
    GetReplyList()
  }, [honeyBoardId, focusUpdate])

  // 좋아요
  useEffect(() => {
    setHeartState(heart)
  }, [heart])

  return (
    <Div className="flex w-full h-full p-10 mt-8 ">
      <Div className="flex flex-col items-center w-full h-full border-y-2 border-mint">
        <Div className="w-full border-b-2 border-gray-200">
          <Subtitle className="mt-6 mb-6">{title}</Subtitle>
          <Div className="flex items-center justify-center w-full mb-6">
            <Itemtitle className="flex items-center ">
              <Icon name="person" className="mr-2" />
              {nickname}
            </Itemtitle>
            {userInfoTrue && (
              <Div className="absolute flex items-center justify-end text-white right-24">
                <button className="mr-2 btn" onClick={updateOnClick}>
                  수정
                </button>
                <button className="mr-2 btn btn-xm btn-error " onClick={deleteOnClick}>
                  삭제
                </button>
              </Div>
            )}
          </Div>
        </Div>
        <Div className="w-full">
          <Div className="flex justify-end w-full mt-6 mb-6 text-gray-400">
            <span className="mr-4">조회 수 {views}</span>
            <span className="mr-8">작성날짜 {regdate?.slice(0, 10)}</span>
          </Div>
        </Div>
        <Div className="w-full mb-6">{content}</Div>
        <Div className="mb-6">
          <button
            className="flex flex-col items-center px-6 py-2 border text-mint"
            onClick={likeOnClick}>
            <Icon name="favorite" className="mb-2" />
            <span className="font-bold ">좋아요 {heartState}</span>
          </button>
        </Div>
        <Div className="flex flex-col items-center w-full mb-6">
          <Div className="w-full p-4">
            <Itemtitle className="mb-2 ml-4 text-start">댓글 작성</Itemtitle>
            <Div className="flex w-full">
              <textarea
                id=""
                className="w-5/6 mr-4 border-2 resize-none border-stone-400 focus:border-red-200 outline-0"
                placeholder="댓글 내용 작성하셈"
                ref={replyContentsRef}></textarea>
              <button
                className="w-1/6 p-4 px-6 font-medium text-gray-900 rounded-lg bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl "
                onClick={replyonClick}>
                등록
              </button>
            </Div>
          </Div>
          <Div className="flex flex-col w-full p-4">
            <Itemtitle className="w-full p-4 bg-gray-100 text-mint text-start">
              댓글 수 {total}
            </Itemtitle>
            <Div className="w-full">{replyData}</Div>
          </Div>
          <Div className="w-full text-right">
            <button
              className="p-4 px-8 mr-4 font-bold text-gray-400 border-2"
              onClick={() => setBoardListTrue?.(false)}>
              수정
            </button>
            <button
              className="p-4 px-8 font-bold text-gray-400 border-2"
              onClick={() => setBoardListTrue?.(false)}>
              목록
            </button>
          </Div>
        </Div>
      </Div>
    </Div>
  )
}

export default HoneyDetailPage
