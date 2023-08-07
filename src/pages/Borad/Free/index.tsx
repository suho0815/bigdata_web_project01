import {FC, useState, useEffect} from 'react'
import {Div} from '../../../components'
import {BoardMenu} from '../BoardMenu'
import Pagination from '../../SearchHospital/HospitalList/Pagination'
import {FreeBoardItem} from './FreeBoardItem'
import FreeFilter from './FreeFilter'

const Free = () => {
  // 2열로 모바일 1열

  const serverUrl: string = 'http://10.125.121.183:8080'

  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const offset = (page - 1) * limit
  let total = 0

  useEffect(() => {
    fetch(`${serverUrl}/free`)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => err.message)
  }, [])

  return (
    <section className="flex flex-col items-center w-full h-full p-10 mt-8 ">
      <FreeFilter />
      <div className="flex justify-center w-full border-y-2 border-mint">
        <FreeBoardItem />
        <FreeBoardItem />
      </div>
      <Div>{/* <Pagination/> */}</Div>
    </section>
  )
}

export default Free
