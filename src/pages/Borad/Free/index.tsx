import type {FC, ReactElement} from 'react'
import {useState, useEffect, useRef} from 'react'
import {Div} from '../../../components'
import {BoardMenu} from '../BoardMenu'
import Pagination from '../../SearchHospital/HospitalList/Pagination'
import {FreeBoardItem} from './FreeBoardItem'
import FreeFilter from './FreeFilter'
import {getCookie} from '../../../util'
import {useNavigate} from 'react-router'

const Free = () => {
  const serverUrl: string = 'http://localhost:8080'
  // const serverUrl: string = 'http://10.125.121.183:8080'
  const Navigate = useNavigate()

  const [limit, setLimit] = useState<number>(20)
  const [page, setPage] = useState<number>(1)
  const offset: number = (page - 1) * limit
  const [total, setTotal] = useState<number | undefined>(0)
  const [renderedItems, setRenderedItems] = useState<ReactElement[]>([])

  useEffect(() => {
    const tokenCookie = getCookie('accessJwtToken:')
    if (tokenCookie) {
      const token = tokenCookie.trim()

      const headers = new Headers()
      headers.append('Authorization', token)
      headers.append('Content-Type', 'application/json')

      fetch(`${serverUrl}/free`, {
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
          const mapItems = data.map((datalist: any, index: number) => (
            <div key={index} className="flex w-1/2 justify-evenly md:w-full">
              <FreeBoardItem
                title={datalist['title']}
                writer={datalist['nickname']}
                date={datalist['regdate']}
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
  }, [])

  return (
    <section className="flex flex-col items-center w-full h-full p-10 mt-8 ">
      <FreeFilter total={total} />
      <div className="flex flex-wrap justify-center w-full border-y-2 border-mint">
        {renderedItems}
      </div>
      <Div>{/* <Pagination/> */}</Div>
    </section>
  )
}

export default Free
