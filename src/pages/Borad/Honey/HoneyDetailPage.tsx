import type {HoneyData} from './index'
import React, {FC} from 'react'
import {DivProps, Subtitle, Icon, Itemsummary, Itemtitle} from '../../../components'
import {Div} from '../../../components'

export type HoneyDetailPage = HoneyData & {
  boardListTrue?: boolean
  setBoardListTrue?: () => {}
}

const HoneyDetailPage: FC<HoneyDetailPage> = ({
  title,
  nickname,
  regdate,
  views,
  heart,
  boardListTrue,
  setBoardListTrue
}) => {
  return (
    <Div className="flex w-full h-full p-10 mt-8 ">
      <Div className="flex flex-col items-center w-full h-full border-y-2 border-mint">
        <Div className="w-full border-b-2 border-gray-200">
          <Subtitle className="mt-6 mb-6">초코가 좋아하는 장난감{title}</Subtitle>
          <Itemtitle className="mb-6">
            <Icon name="person" className="mr-2" />
            이수호{nickname}
          </Itemtitle>
        </Div>
        <Div className="w-full">
          <Div className="flex justify-end w-full mt-6 mb-6 text-gray-400">
            <span className="mr-4">조회 수{views}</span>
            <span className="mr-8">작성날짜{regdate}</span>
          </Div>
        </Div>
        <Div className="w-full mb-6">컨텐츠 내용</Div>
        <Div className="mb-6">
          <button className="flex flex-col items-center px-6 py-2 border text-mint">
            <Icon name="favorite" className="mb-2" />
            <span className="font-bold ">좋아요{heart}</span>
          </button>
        </Div>
        <Div className="flex flex-col items-center w-full mb-6">
          <Div className="w-full p-4">
            <Itemtitle className="mb-2 ml-4 text-start">댓글 작성</Itemtitle>
            <Div className="flex w-full">
              <textarea
                id=""
                className="w-5/6 mr-4 border-2 resize-none border-stone-400 focus:border-red-200 outline-0"
                placeholder="댓글 내용 작성하셈"></textarea>
              <button className="w-1/6 p-4 px-6 font-medium text-gray-900 rounded-lg bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl ">
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
            <button className="p-4 px-8 font-bold text-gray-400 border-2">목록</button>
          </Div>
        </Div>
      </Div>
    </Div>
  )
}

export default HoneyDetailPage
