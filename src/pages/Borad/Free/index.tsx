import {FC, useState, useEffect} from 'react'
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

  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const offset = (page - 1) * limit
  let total = 0

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
        .then(data => console.log(data))
        .catch(err => err.message)
    } else {
      Navigate('/')
      alert('로그인이 필요한 서비스입니다.')
    }
  }, [])

  return (
    <section className="flex flex-col items-center w-full h-full p-10 mt-8 ">
      <FreeFilter />
      <div className="flex justify-center w-full border-y-2 border-mint md:flex-col">
        <FreeBoardItem />
        <FreeBoardItem />
      </div>
      <Div>{/* <Pagination/> */}</Div>
    </section>
  )
}

export default Free
