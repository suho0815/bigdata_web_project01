import type {FC, ReactElement} from 'react'
import HospitalListItem from './HospitalListItem'
import {useState, useEffect} from 'react'
import type {ListItem} from './HospitalListItem'
import {useLocation, useNavigate} from 'react-router-dom'
import Pagination from './Pagination'

const HospitalList: React.FC<{sharedHospital: any}> = ({sharedHospital}) => {
  const [limit, setLimit] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const offset = (page - 1) * limit
  let total = 0

  const url = 'https://map.naver.com/v5/search/'

  const state = useLocation().state

  let listitems: ReactElement[] = []

  if (state !== null) {
    sharedHospital = []
    const pethospital = state['hospital_name']
    total = pethospital.length
    pethospital.map((list: [], index: number) => {
      listitems.push(
        <a href={url + pethospital[index]['hospitalName']} key={index}>
          <HospitalListItem
            title={pethospital[index]['hospitalName']}
            telephone={pethospital[index]['phone_number']}
            location={pethospital[index]['street_address']}
            imgsrc=""
          />
        </a>
      )
    })
  } else if (sharedHospital && sharedHospital['pethospital']) {
    const pethospital = sharedHospital['pethospital']
    total = sharedHospital['pethospital'].length
    pethospital.map((list: [], index: number) => {
      listitems.push(
        <a href={url + pethospital[index]['hospitalName']} key={index}>
          <HospitalListItem
            title={pethospital[index]['hospitalName']}
            telephone={pethospital[index]['phone_number']}
            location={pethospital[index]['street_address']}
            imgsrc=""
          />
        </a>
      )
    })
  } else if (sharedHospital && sharedHospital['hospital_name']) {
    const pethospital = sharedHospital['hospital_name']
    total = sharedHospital['hospital_name'].length
    pethospital.map((list: [], index: number) => {
      listitems.push(
        <a href={url + pethospital[index]['hospitalName']} key={index}>
          <HospitalListItem
            title={pethospital[index]['hospitalName']}
            telephone={pethospital[index]['phone_number']}
            location={pethospital[index]['street_address']}
            imgsrc=""
          />
        </a>
      )
    })
  } else {
    // sharedHospital이 null인 경우에 대한 처리
  }

  return (
    <div className="flex flex-col w-3/4 h-full mb-4">
      {listitems.slice(offset, offset + limit).map(data => data)}
      <Pagination total={total} limit={limit} page={page} setPage={setPage} />
    </div>
  )
}
export default HospitalList
