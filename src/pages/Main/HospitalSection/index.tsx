import {FC} from 'react'
import {Icon, Div, Card, Title} from '../../../components'
import dog from '../../../images/cute-dog.png'

const HospitalSection: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-4">
      <Title className="mt-20 mb-10">인기 병원</Title>
      <Div className="relative z-10 p-4 bg-white bg-opacity-50 rounded-lg">
        <div className="flex items-center">
          <div className="lg:hidden">
            <Icon name="arrow_back_ios" style={{fontSize: '60px'}}></Icon>
          </div>
          <Div
            className="flex overflow-scroll overflow-x-auto flex-nowrap wrap-vertical drag"
            style={{scrollBehavior: 'smooth'}}
            width="80vw">
            <Card imgsrc={dog} hospitalName="병원" locate="주소" />
            <Card imgsrc={dog} hospitalName="병원" locate="주소" />
            <Card imgsrc={dog} hospitalName="병원" locate="주소" />
            <Card imgsrc={dog} hospitalName="병원" locate="주소" />
            <Card imgsrc={dog} hospitalName="병원" locate="주소" />
            <Card imgsrc={dog} hospitalName="병원" locate="주소" />
          </Div>
          <div className="lg:hidden">
            <Icon name="arrow_forward_ios" style={{fontSize: '60px'}}></Icon>
          </div>
        </div>
      </Div>
    </div>
  )
}

export default HospitalSection
