import {FC, useState} from 'react'
import {Div} from '../../../components'
import {HoneyBoardItem} from './HoneyBoardItems'
import HoneyFilter from './HoneyFilter'
import Pagination from '../../SearchHospital/HospitalList/Pagination'

const Honey = () => {
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const offset = (page - 1) * limit
  let total = 0

  return (
    <section className="flex flex-col items-center w-full h-full p-10 mt-8 ">
      <HoneyFilter />
      <div className="w-full border-y-2 border-mint">
        <HoneyBoardItem />
        <HoneyBoardItem />
      </div>
      <Div>{/* <Pagination /> */}</Div>
    </section>
  )
}

export default Honey
