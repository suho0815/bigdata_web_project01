import type {FC} from 'react'
import {Div} from '../../../components'
import {Link} from 'react-router-dom'
import tipImage from '../../../images/french-bulldog-4372435_640.jpg'
import dogImage from '../../../images/dachshund-5978830_1280.jpg'

const CommunitySection = () => {
  return (
    <Div className="flex w-full h-full mt-8 mb-8 lg:flex-col">
      <Div
        className="flex flex-col items-start w-full text-xl font-bold text-white bg-center bg-no-repeat bg-cover border opacity-90 p-7"
        src={dogImage}
        height="480px">
        <div className="mb-8">행복한 일상을 공유해주세요!</div>
        <Link to="./board/free">
          <button className="text-white btn btn-info">자랑하러 가기</button>
        </Link>
      </Div>
      <Div
        className="flex flex-col items-end w-full text-xl font-bold text-white bg-center bg-no-repeat bg-cover border opacity-90 p-7"
        src={tipImage}
        height="480px">
        <div className="mb-8">
          아이를 키우는데 필요한 <br /> 소중한 정보를 공유해주세요!
        </div>
        <Link to="board/honey">
          <button className="text-white btn btn-info">꿀팁 바로가기</button>
        </Link>
      </Div>
    </Div>
  )
}

export default CommunitySection
