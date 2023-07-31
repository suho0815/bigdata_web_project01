import type {ChangeEventHandler, FC, ChangeEvent} from 'react'
import type {ReactElement} from 'react'
import {useRef, useState, useCallback} from 'react'
import {Icon, Div, Modal, ModalContent, ModalAction} from '../../../components'
import {Title, Subtitle, Select} from '../../../components'
import {Link} from 'react-router-dom'

const Filter = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [sido, setSido] = useState<ReactElement[]>()
  const [gungu, setGungu] = useState<ReactElement[]>()

  const sidoref = useRef<HTMLSelectElement>(null)

  const detailSearchOnClick = useCallback(() => {
    setOpen(true)

    fetch('http://10.125.121.183:8080/api/province')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        console.log('Data:', data)
        setSido(
          data['province'].map((sidodata: string, index: number) => (
            <option value={sidodata} key={index}>
              {sidodata}
            </option>
          ))
        )
        console.log(sido)
      })
      .catch(error => console.log('Error:', error.message))
  }, [])

  const detailSearchClosed = useCallback(() => {
    setOpen(false)
  }, [])

  const provinceChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = event.target.value

      if (sidoref.current !== null) console.log('sidoref:', sidoref.current.value)

      fetch(`http://10.125.121.183:8080/api/province/${selectedValue}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then(data => {
          console.log('Data:', data)
        })
      // return selectedValue
    },
    [sido]
  )

  const gunguChange = () => {}

  return (
    <Div className="flex flex-col items-center justify-center w-full p-4 border">
      <Modal open={open}>
        <ModalContent className="" onCloseIconClicked={detailSearchClosed}>
          <Subtitle className="">상세 검색</Subtitle>
          <div className="mt-8 text-justify">
            <div className="flex justify-center">
              <Select
                labelChildren="광역시도"
                name="province"
                selectChildren={sido}
                selectRef={sidoref}
              />
              <Select
                labelChildren="시군구"
                name="gungu"
                className="ml-8"
                // onChange={provinceChange}
                // selectChildren={<option value="서구">서구</option>}
              />
              <Select
                labelChildren="읍면동"
                name="dong"
                className="ml-8"
                // selectChildren={<option value="무슨동">무슨동</option>}
              />
            </div>
            <ModalAction className="mt-12">
              <input type="submit" className="text-white btn btn-info" value="검색" />
              <button className="btn" onClick={detailSearchClosed}>
                닫기
              </button>
            </ModalAction>
          </div>
        </ModalContent>
      </Modal>
      <Subtitle className="mb-8">동물 병원 찾기</Subtitle>
      <div className="flex justify-center w-full mb-4">
        <div className="flex w-1/2 p-2 bg-gray-100 rounded-xl">
          <input
            type="text"
            className="w-11/12 p-2 bg-gray-100 rounded-xl "
            placeholder=" 검색"
          />
          <Icon
            name="search"
            className="w-1/12 p-2 ml-4 bg-gray-100 btn rounded-xl"></Icon>
        </div>
      </div>

      <div className="relative flex justify-end w-full min-w-max ">
        <button
          className="text-lg text-white btn bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
          onClick={detailSearchOnClick}>
          상세 검색
        </button>
      </div>
    </Div>
  )
}
export default Filter
