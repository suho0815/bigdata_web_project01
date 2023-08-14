import type {FC, ReactElement} from 'react'
import {useState, useEffect, useRef} from 'react'
import {Div} from '../../../components'
import Pagination from '../../SearchHospital/HospitalList/Pagination'
import {FreeBoardItem} from './FreeBoardItem'
import FreeFilter from './FreeFilter'
import {getCookie} from '../../../util'
import {useNavigate} from 'react-router'
import FreeDetailModal from './FreeDetailModal'

const Free = () => {
  const Navigate = useNavigate()

  const [limit, setLimit] = useState<number>(20)
  const [page, setPage] = useState<number>(1)
  const offset: number = (page - 1) * limit
  const [total, setTotal] = useState<number | undefined>(0)
  const [renderedItems, setRenderedItems] = useState<ReactElement[]>([])

  const [viewDetailModal, setViewDetailModal] = useState<boolean>(false)
  const [titleData, setTitleData] = useState<string>('')
  const [freeBoardId, setFreeBoardId] = useState<number>()
  const [heart, setHeart] = useState<number>()
  const [replyCnt, setReplyCnt] = useState<number>()

  const DetailModalClick = (title: string, freeBoardid: number, Heart: number) => {
    setTitleData(title)
    setFreeBoardId(freeBoardid)
    setHeart(Heart)
    // setReplyCnt(ReplyCnt)
    // console.log(title)
    if (viewDetailModal === false) setViewDetailModal(true)
    else setViewDetailModal(false)
  }

  useEffect(() => {
    const tokenCookie = getCookie('accessJwtToken:')
    if (tokenCookie) {
      const token = tokenCookie.trim()

      const headers = new Headers()
      headers.append('Authorization', token)
      headers.append('Content-Type', 'application/json')

      fetch(`${process.env.REACT_APP_SERVER_URL}/free`, {
        method: 'GET',
        headers: headers
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
            <div key={index} className="flex w-1/3 justify-evenly w-responsive-custom">
              <FreeBoardItem
                title={datalist['title']}
                writer={datalist['nickname']}
                date={datalist['regdate']}
                heart={datalist['likes']}
                // replycnt={data.length}
                onClick={() =>
                  DetailModalClick(
                    datalist['title'],
                    datalist['freeBoardId'],
                    datalist['likes']
                  )
                }
              />
            </div>
          ))
          setTotal(mapItems.length)
          setRenderedItems(mapItems)
        })
        .catch(err => err.message)
    } else {
      Navigate('/')
      alert('로그인이 필요한 서비스입니다.')
    }
  }, [viewDetailModal])

  return (
    <section className="w-full p-10 mt-8 ">
      <div className="flex flex-col items-center w-full h-full p-10">
        <FreeFilter total={total} />
        <div className="flex flex-wrap justify-center w-full border-y-2 border-mint">
          {renderedItems}
        </div>
      </div>
      {viewDetailModal && (
        <FreeDetailModal
          onCloseIconClick={() => setViewDetailModal(false)}
          title={titleData}
          freeBoardId={freeBoardId}
          heart={heart}
        />
      )}
      <Div>{/* <Pagination/> */}</Div>
    </section>
  )
}

export default Free
