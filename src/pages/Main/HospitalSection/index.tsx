import type {MouseEvent} from 'react'
import {FC, useState, useRef} from 'react'
import {Icon, Div, Card, Title} from '../../../components'
import dog from '../../../images/cute-dog.png'

const HospitalSection: React.FC = () => {
  const forward = document.getElementById('forward')

  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDrag, setIsDrag] = useState(false)
  const [startX, setStartX] = useState<number | undefined>()

  const onDragStart = (e: MouseEvent) => {
    e.preventDefault()
    setIsDrag(true)
    setStartX(e.pageX + (scrollRef.current?.scrollLeft ?? 0))
  }

  const onDragEnd = () => {
    setIsDrag(false)
  }

  const onDragMove = (e: MouseEvent) => {
    if (isDrag && scrollRef.current) {
      scrollRef.current.scrollLeft = (startX ?? 0) - e.pageX
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-4">
      <Title className="mt-20 mb-10">인기 병원</Title>
      <Div className="relative z-10 p-4 bg-white bg-opacity-50 rounded-lg">
        <div className="flex items-center">
          <div className="lg:hidden">
            <Icon name="arrow_back_ios" style={{fontSize: '60px'}}></Icon>
          </div>
          <Div
            ref={scrollRef}
            className="flex overflow-x-scroll flex-nowrap wrap-vertical"
            style={{scrollBehavior: 'smooth'}}
            width="80vw"
            onMouseDown={onDragStart}
            onMouseMove={onDragMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}>
            <Card imgsrc={dog} hospitalName="병원" locate="주소" />
            <Card imgsrc={dog} hospitalName="병원" locate="주소" />
            <Card imgsrc={dog} hospitalName="병원" locate="주소" />
            <Card imgsrc={dog} hospitalName="병원" locate="주소" />
            <Card imgsrc={dog} hospitalName="병원" locate="주소" />
            <Card imgsrc={dog} hospitalName="병원" locate="주소" />
          </Div>
          <div className="lg:hidden">
            <Icon name="arrow_forward_ios" id="forward" style={{fontSize: '60px'}}></Icon>
          </div>
        </div>
      </Div>
    </div>
  )
}

export default HospitalSection
