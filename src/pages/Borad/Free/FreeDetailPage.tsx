import React, {FC} from 'react'
import {
  DivProps,
  Subtitle,
  Icon,
  Itemsummary,
  Itemtitle,
  Modal,
  ModalContent,
  ModalAction
} from '../../../components'
import {Div} from '../../../components'

export type FreeDetailPageProps = DivProps & {
  open?: boolean
}

//게시글번호(string), "free"
const FreeDetailPage: FC<FreeDetailPageProps> = () => {
  return (
    <Modal>
      <ModalContent className="max-w-3xl">
        <div className="p-12 mt-8 text-center ">
          <div className="flex justify-center"></div>
          <ModalAction className="mt-12">
            <button type="submit" className="text-white btn btn-info">
              검색
            </button>
            <button className="btn">닫기</button>
          </ModalAction>
        </div>
      </ModalContent>
    </Modal>
  )
}

export default FreeDetailPage
