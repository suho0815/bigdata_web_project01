import type {ChangeEventHandler, FC, ChangeEvent} from 'react'
import type {ReactElement} from 'react'
import {useRef, useState, useCallback, useEffect} from 'react'
import {Icon, Div, Modal, ModalContent, ModalAction} from '../../../components'
import {Title, Subtitle, Select} from '../../../components'
import HospitalListItem from '../HospitalList/HospitalListItem'
import {useLocation, useNavigate} from 'react-router-dom'

const Filter: React.FC<{onDataChange: any}> = ({onDataChange}) => {
  const serverUrl: string = 'http://localhost:8080'
  // const serverUrl: string = 'http://10.125.121.183:8080'

  const [open, setOpen] = useState<boolean>(false)
  const [sido, setSido] = useState<ReactElement[] | null>()
  const [gungu, setGungu] = useState<ReactElement[] | null>()
  const [dong, setDong] = useState<ReactElement[] | null>()

  const sidoref = useRef<HTMLSelectElement>(null)
  const gunguref = useRef<HTMLSelectElement>(null)
  const dongref = useRef<HTMLSelectElement>(null)
  const keywordref = useRef<HTMLInputElement>(null)

  const Navigate = useNavigate()
  const state = useLocation().state

  const detailSearchOnClick = useCallback(() => {
    setOpen(true)

    fetch(`${serverUrl}/province`)
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
      })
      .catch(error => console.log('Error:', error.message))
  }, [])

  const detailSearchClosed = useCallback(() => {
    setOpen(false)
  }, [])

  const provinceChange = useCallback(
    (event: any) => {
      const selectedValue = event.target.value

      fetch(`${serverUrl}/province/${selectedValue}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then(data => {
          console.log('Data:', data)

          if (gungu !== null) {
            setGungu(null)
          }
          if (dong !== null) {
            setDong(null)
          }

          setGungu(
            data['sigungu'].map((gungudata: string, index: number) => (
              <option value={gungudata} key={index}>
                {gungudata}
              </option>
            ))
          )
        })
        .catch(error => console.log('Error:', error.message))
    },
    [sido]
  )

  const gunguChange = useCallback(
    (event: any) => {
      const selectedValue = event.target.value
      let gunguselected = ''
      if (sidoref.current !== null) gunguselected = sidoref.current.value

      if (selectedValue !== null) {
        console.log('gungudata: ', selectedValue)
      }
      fetch(`${serverUrl}/province/${gunguselected}/${selectedValue}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok')
          }
          return response.json()
        })
        .then(data => {
          console.log('Data: ', data)
          if (dong !== null) {
            setDong(null)
          }
          setDong(
            data['dong'].map((dongdata: string, index: number) => (
              <option value={dongdata} key={index}>
                {dongdata}
              </option>
            ))
          )
        })
        .catch(error => console.log('Error:', error.message))
    },
    [gungu]
  )

  const modalContentClick = useCallback(() => {
    let selectedSido = ''
    if (sidoref.current !== null) selectedSido = sidoref.current.value
    let selectedGungu = ''
    if (gunguref.current !== null) selectedGungu = gunguref.current.value
    let selectedDong = ''
    if (dongref.current !== null) selectedDong = dongref.current.value
    // /${selectedGungu}/${selectedDong}
    fetch(
      `${serverUrl}/hospital/${selectedSido}${
        selectedGungu !== '' ? '/' + selectedGungu : ''
      }${selectedDong !== '' ? '/' + selectedDong : ''}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        onDataChange(data)
        Navigate('/api/searchhospital', {state: null})
        setOpen(false)
      })
      .catch(err => err.message)
  }, [])

  const keywordSearchClick = useCallback(() => {
    let keyword = ''
    if (keywordref.current !== null) keyword = keywordref.current.value

    fetch(`${serverUrl}/searchhospital/${keyword}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then(data => {
        onDataChange(data)
      })
      .catch(err => err.message)
  }, [])

  return (
    <Div className="flex flex-col items-center justify-center w-full p-4 border bg-lightmint">
      <Modal open={open}>
        <ModalContent className="max-w-3xl" onCloseIconClicked={detailSearchClosed}>
          <Subtitle className="mt-4">상세 검색</Subtitle>
          <div className="p-12 mt-8 text-center ">
            <div className="flex justify-center">
              <Select
                labelChildren="광역시도"
                name="province"
                selectChildren={sido}
                selectRef={sidoref}
                defaultOption="선택"
                onChange={provinceChange}
              />
              <Select
                labelChildren="시군구"
                name="gungu"
                className="ml-8"
                onChange={gunguChange}
                selectRef={gunguref}
                defaultOption="선택"
                selectChildren={gungu}
              />
              <Select
                labelChildren="읍면동"
                name="dong"
                className="ml-8"
                defaultOption="선택"
                selectChildren={dong}
                selectRef={dongref}
              />
            </div>
            <ModalAction className="mt-12">
              <button
                type="submit"
                className="text-white btn btn-info"
                onClick={modalContentClick}>
                검색
              </button>
              <button className="btn" onClick={detailSearchClosed}>
                닫기
              </button>
            </ModalAction>
          </div>
        </ModalContent>
      </Modal>
      <Subtitle className="mt-8 mb-8">동물 병원 찾기</Subtitle>
      <div className="flex justify-center w-full mb-4">
        <div className="flex w-1/2 p-2 bg-white border-8 border-mint rounded-xl">
          <input
            type="text"
            className="w-11/12 p-2 bg-white rounded-xl "
            placeholder=" 검색"
            ref={keywordref}
          />
          <Icon
            name="search"
            className="w-1/12 p-2 ml-4 bg-white btn rounded-xl"
            onClick={keywordSearchClick}></Icon>
        </div>
      </div>

      <div className="relative flex justify-end w-full min-w-max ">
        <button
          className="text-lg text-white btn bg-gradient-to-r from-green-200 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
          onClick={detailSearchOnClick}>
          상세 검색
        </button>
      </div>
    </Div>
  )
}
export default Filter
