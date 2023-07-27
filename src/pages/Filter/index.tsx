import type {FC} from 'react'
import {useRef, useState, useCallback} from 'react'
import {Icon, Div, Modal, ModalContent, ModalAction} from '../../components'
import {Title, Subtitle, Select} from '../../components'
import {Link} from 'react-router-dom'

const Filter = () => {
  const [open, setOpen] = useState<boolean>(false)

  const detailSearchOnClick = () => {
    setOpen(true)
  }

  const detailSearchClosed = () => {
    setOpen(false)
  }

  const onSearchClick = () => {}

  const onDetailClick = () => {}

  return (
    <Div className="flex items-center justify-around w-full border" height="10%">
      <Modal open={open}>
        <ModalContent className="" onCloseIconClicked={detailSearchClosed}>
          <Subtitle className="">상세 검색</Subtitle>
          <div className="mt-8 text-justify">
            <form action="">
              <div className="flex justify-center">
                <Select
                  labelChildren="광역시도"
                  name="sido"
                  selectChildren={<option value="부산">부산광역시</option>}
                />
                <Select labelChildren="시군구" name="gungu" className="ml-8" />
                <Select labelChildren="읍면동" name="dong" className="ml-8" />
              </div>
              <ModalAction className="mt-12">
                <input type="submit" className="text-white btn btn-info" value="검색" />
                <button className="btn">닫기</button>
              </ModalAction>
            </form>
          </div>
        </ModalContent>
      </Modal>

      <div className="w-1/3 max-w-sm min-w-max">
        <Title>
          {/* <Link to={`/?sido=${''}&gungu=${''}&dong=${''}`}>Title</Link> */}
          <Link to="/">Title</Link>
        </Title>
      </div>

      <div className="w-1/3 min-w-max">
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

      <div className="relative flex w-1/3 justify-evenly min-w-max">
        <button className="text-white btn btn-info" onClick={detailSearchOnClick}>
          상세 검색
        </button>
        <div className="flex">
          <button className="btn ">
            <Link to="/login">로그인</Link>
          </button>
          <button className="ml-6 btn">
            <Link to="/join">회원가입</Link>
          </button>
        </div>
      </div>
    </Div>
  )
}
export default Filter
