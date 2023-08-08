import type {FC, ReactElement} from 'react'
import {useState, useEffect} from 'react'
import {Div} from '../../../components'
import {HoneyBoardItem} from './HoneyBoardItems'
import HoneyFilter from './HoneyFilter'
import Pagination from '../../SearchHospital/HospitalList/Pagination'

const Honey = () => {
  const serverUrl: string = 'http://localhost:8080'
  // const serverUrl: string = 'http://10.125.121.183:8080'

  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const offset = (page - 1) * limit
  const [total, setTotal] = useState<number | undefined>(0)
  const [renderedItems, setRenderedItems] = useState<ReactElement[]>([])

  useEffect(() => {
    try {
      fetch(`${serverUrl}/honey`, {
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
              // title={datalist['title']}
              // writer={datalist['nickname']}
              // date={datalist['regdate']}
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
    <section className="flex flex-col items-center w-full h-full p-10 mt-8 ">
      <HoneyFilter total={total} />
      <div className="w-full border-y-2 border-mint">
        <HoneyBoardItem />
        <HoneyBoardItem />
      </div>
      <Div>{/* <Pagination /> */}</Div>
    </section>
  )
}

export default Honey
