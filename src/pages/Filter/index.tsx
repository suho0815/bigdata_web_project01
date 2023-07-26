import type {FC} from 'react'
import {useRef, useState} from 'react'
import {Icon, Div, Modal, ModalContent, ModalAction} from '../../components'
import {Title, Subtitle, Select} from '../../components'

const Filter = () => {
  const [open, setOpen] = useState<boolean>(false)

  const detailSearchOnClick = () => {
    setOpen(true)
  }

  const detailSearchClosed = () => {
    setOpen(false)
  }

  return (
    <Div className="flex items-center justify-around w-full border" height="10%">
      <Modal open={open}>
        <ModalContent className="" onCloseIconClicked={detailSearchClosed}>
          <Subtitle className="">상세 검색</Subtitle>
          <div className="mt-8 text-justify">
            <form action="">
              <div className="flex justify-center">
                <Select labelChildren="광역시도" className="ml-0" />
                <Select labelChildren="시군구" />
                <Select labelChildren="읍면동" />
              </div>
              <ModalAction className="mt-12">
                <input
                  type="submit"
                  className="text-white btn btn-success"
                  value="검색"
                />
                <button className="btn">닫기</button>
              </ModalAction>
            </form>
          </div>
        </ModalContent>
      </Modal>

      <div className="w-1/3">
        <Title>Title</Title>
      </div>

      <div className="w-1/3">
        <div className="flex w-full p-2 bg-gray-200 rounded-xl">
          <input
            type="text"
            className="w-11/12 p-2 bg-gray-200 rounded-xl"
            placeholder=" 검색"
          />
          <Icon
            name="search"
            className="w-1/12 p-2 ml-4 bg-gray-200 btn rounded-xl"></Icon>
        </div>
      </div>

      <div className="flex w-1/3 justify-evenly">
        <button className="text-white btn btn-success" onClick={detailSearchOnClick}>
          상세 검색
        </button>
        <div className="flex">
          <button className="btn ">로그인</button>
          <button className="ml-6 btn">회원가입</button>
        </div>
      </div>
    </Div>
  )
}
export default Filter
