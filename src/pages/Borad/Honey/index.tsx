import type {FC, ReactElement} from 'react'
import {useState, useEffect} from 'react'
import {Div} from '../../../components'
import {HoneyBoardItem} from './HoneyBoardItems'
import HoneyFilter from './HoneyFilter'
import Pagination from '../../SearchHospital/HospitalList/Pagination'
import HoneyDetailPage from './HoneyDetailPage'
import {getCookie, getUserInfoFromToken} from '../../../util'

export type HoneyData = {
  title?: string
  // nickname?: string
  // regdate?: string
  // views?: number
  // heart?: number
}

const Honey = () => {
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const offset = (page - 1) * limit
  const [total, setTotal] = useState<number | undefined>(0)
  const [renderedItems, setRenderedItems] = useState<ReactElement[]>([])

  const [viewDetailPage, setViewDetailPage] = useState<boolean>(false)
  const [heartBtnCheck, setHeartBtnCheck] = useState<boolean>(false)
  // const [detailPageChange, setDetailPageChange] = useState<boolean>(false)
  const [detailData, setDetailData] = useState<any>()

  const DetailPageClick = (data: HoneyData) => {
    // 클릭한 데이터 출력
    setDetailData(data)

    if (viewDetailPage === false) setViewDetailPage(true)
    else setViewDetailPage(false)
  }

  const GetBoardList = () => {
    try {
      // 좋아요 상태 조회
      const tokenCookie = getCookie('accessJwtToken:')
      if (tokenCookie) {
        const token = tokenCookie.trim()
        const headers = new Headers()
        headers.append('Authorization', token)
        headers.append('Content-Type', 'application/json')
        fetch(`${process.env.REACT_APP_SERVER_URL}/like/honey`, {
          method: 'GET',
          headers: headers
        })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => error.message)
      }

      // 게시글 목록 조회
      fetch(`${process.env.REACT_APP_SERVER_URL}/honey`, {
        method: 'GET'
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            throw new Error('Network response was not ok')
          }
        })
        .then(data => {
          // console.log(data)
          const mapItems = data.map((datalist: any, index: number) => (
            <HoneyBoardItem
              key={index}
              title={datalist['title']}
              writer={datalist['nickname']}
              date={datalist['regdate']}
              views={datalist['views']}
              heart={datalist['likes']}
              onClick={() => DetailPageClick(datalist)}
            />
          ))
          setTotal(mapItems.length)
          setRenderedItems(mapItems)
        })
        .catch(err => err.message)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    GetBoardList()
  }, [viewDetailPage])

  return (
    <section className="flex w-full h-full p-10 mt-8 ">
      {!viewDetailPage && (
        <div className="flex flex-col items-center w-full h-full p-10 mt-8 ">
          <HoneyFilter total={total} />
          <div className="w-full border-y-2 border-mint">{renderedItems}</div>
        </div>
      )}
      {viewDetailPage && (
        <HoneyDetailPage
          title={detailData['title']}
          detailData={detailData}
          userId={detailData['userId']}
          honeyBoardId={detailData['honeyBoardId']}
          setBoardListTrue={() => setViewDetailPage(false)}
          setHeartBtnCheck={setHeartBtnCheck}
          GetBoardList={GetBoardList}
        />
      )}
      <Div>{/* <Pagination /> */}</Div>
    </section>
  )
}

export default Honey
