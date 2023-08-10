import type {FC, ReactElement} from 'react'
import {useState, useEffect} from 'react'
import {Div} from '../../../components'
import {HoneyBoardItem} from './HoneyBoardItems'
import HoneyFilter from './HoneyFilter'
import Pagination from '../../SearchHospital/HospitalList/Pagination'
import HoneyDetailPage from './HoneyDetailPage'

export type HoneyData = {
  title?: string
  nickname?: string
  regdate?: string
  views?: number
  heart?: number
}

const Honey = () => {
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const offset = (page - 1) * limit
  const [total, setTotal] = useState<number | undefined>(0)
  const [renderedItems, setRenderedItems] = useState<ReactElement[]>([])

  const [viewDetailPage, setViewDetailPage] = useState<boolean>(false)
  const [detailData, setDetailData] = useState<any>()

  const DetailPageClick = (data: HoneyData) => {
    // 클릭한 데이터 출력
    console.log(data)
    setDetailData(data)

    if (viewDetailPage === false) setViewDetailPage(true)
    else setViewDetailPage(false)
  }

  useEffect(() => {
    try {
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
          console.log(data)
          const mapItems = data.map((datalist: any, index: number) => (
            <HoneyBoardItem
              key={index}
              title={datalist['title']}
              writer={datalist['nickname']}
              date={datalist['regdate']}
              views={datalist['views']}
              // heart={}
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
  }, [])

  return (
    <section className="flex w-full h-full p-10 mt-8 ">
      {!viewDetailPage && (
        <div className="flex flex-col items-center w-full h-full p-10 mt-8 ">
          <HoneyFilter total={total} />
          <div className="w-full border-y-2 border-mint">{renderedItems}</div>
        </div>
      )}
      {viewDetailPage && <HoneyDetailPage />}
      <Div>{/* <Pagination /> */}</Div>
    </section>
  )
}

export default Honey
