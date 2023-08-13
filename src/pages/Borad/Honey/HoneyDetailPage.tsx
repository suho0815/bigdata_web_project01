import type {MouseEventHandler} from 'react'
import type {HoneyData} from './index'
import React, {FC, useEffect, useState, useRef} from 'react'
import {DivProps, Subtitle, Icon, Itemsummary, Itemtitle} from '../../../components'
import {Div} from '../../../components'
import {getCookie} from '../../../util'
import {error} from 'console'

export type HoneyDetailPage = HoneyData & {
  honeyBoardId?: number
  content?: string
  setBoardListTrue?: MouseEventHandler<HTMLButtonElement>
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
  setBoardListTrue,
  setHeartBtnCheck
}) => {
  const replyContentsRef = useRef<HTMLTextAreaElement | null>(null)
  const [replyData, setReplyData] = useState()
  const [heartState, setHeartState] = useState<number>()

  const tokenCookie = getCookie('accessJwtToken:')
  const token = tokenCookie?.trim()
  const headers = new Headers()
  headers.append('Authorization', token)
  headers.append('Content-Type', 'application/json')
  //게시글번호(string), "honey"

  //좋아요 버튼 클릭 시
  const likeOnClick = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/like/honey/${honeyBoardId}`, {
      method: 'POST',
      headers: headers
    })
      .then(response => response.text())
      .then(data => {
        console.log(data)
        console.log(heart)
        setHeartBtnCheck(true)
        setHeartState(heart)
      })
      .catch(error => error.message)
  }

  // 게시글 수정버튼 클릭 시
  const updateonClick = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/honey/${honeyBoardId}`, {
      method: 'PUT',
      headers: headers
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => error.message)
  }

  // 댓글 등록버튼 클릭 시
  const replyonClick = () => {
    console.log(replyContentsRef.current?.value)
    fetch(`${process.env.REACT_APP_SERVER_URL}/honeyReply/${honeyBoardId}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        contents: replyContentsRef.current?.value
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => error.message)
  }

  // 댓글 리스트 띄우기
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/honeyReply`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => error.message)
  }, [honeyBoardId])

  // 좋아요
  useEffect(() => {
    setHeartState(heart)
  }, [heart])

  return (
    <Div className="flex w-full h-full p-10 mt-8 ">
      <Div className="flex flex-col items-center w-full h-full border-y-2 border-mint">
        <Div className="w-full border-b-2 border-gray-200">
          <Subtitle className="mt-6 mb-6">{title}</Subtitle>
          <Itemtitle className="mb-6">
            <Icon name="person" className="mr-2" />
            {nickname}
          </Itemtitle>
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
              댓글 수
            </Itemtitle>
            <Div className="w-full">댓글 리스트</Div>
          </Div>
          <Div className="w-full text-right">
            <button
              className="p-4 px-8 mr-4 font-bold text-gray-400 border-2"
              onClick={setBoardListTrue}>
              수정
            </button>
            <button
              className="p-4 px-8 font-bold text-gray-400 border-2"
              onClick={setBoardListTrue}>
              목록
            </button>
          </Div>
        </Div>
      </Div>
    </Div>
  )
}

export default HoneyDetailPage
