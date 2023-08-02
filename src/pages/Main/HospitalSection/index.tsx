import type {MouseEvent} from 'react'
import {FC, useState, useRef, forwardRef, useImperativeHandle} from 'react'
import {Icon, Div, Card, Title} from '../../../components'
import dog from '../../../images/cute-dog.png'
import choco1 from '../../../images/choco1.jpg'
import choco2 from '../../../images/choco2.jpg'
import choco3 from '../../../images/choco3.jpg'

const HospitalSection: React.FC = //forwardRef((props, ref)
  () => {
    const forward = document.getElementById('forward')

    const scrollRef = useRef<HTMLDivElement>(null)
    // useImperativeHandle(ref, () => scrollRef.current)
    const [isDrag, setIsDrag] = useState(false)
    const [startX, setStartX] = useState<number | undefined>(0)

    const onDragStart = (e: MouseEvent) => {
      e.preventDefault()
      setIsDrag(true)
      setStartX(e.pageX + (scrollRef.current?.scrollLeft ?? 0))
    }

    const onDragEnd = () => {
      setIsDrag(false)
    }

    const onThrottleDragMove = (onDragMove: (...args: any[]) => void) => {
      const delay = 10
      let throttled = false
      return (...args: any[]) => {
        if (!throttled) {
          throttled = true
          setTimeout(() => {
            onDragMove(...args)
            throttled = false
          }, delay)
        }
      }
    }

    const onDragMove = (e: MouseEvent) => {
      if (isDrag && scrollRef.current) {
        const {scrollWidth, clientWidth, scrollLeft} = scrollRef.current

        scrollRef.current.scrollLeft = (startX ?? 0) - e.pageX

        if (scrollLeft === 0) {
          setStartX(e.pageX)
        } else if (scrollWidth <= clientWidth + scrollLeft) {
          setStartX(e.pageX + scrollLeft)
        }
        console.log(scrollRef.current.scrollLeft)
      }
    }

    return (
      <div className="flex flex-col items-center justify-center w-full h-screen p-4">
        <Div className="flex items-center mt-20 mb-10">
          <img src={dog} alt="" className="object-cover w-20" />
          <Title className="ml-8 mr-8">인기 병원</Title>
          <img src={dog} alt="" className="object-cover w-20" />
        </Div>

        <Div className="relative z-10 p-4 bg-white bg-opacity-50 rounded-lg">
          <div className="flex items-center">
            <div className="lg:hidden">
              <Icon name="arrow_back_ios" style={{fontSize: '60px'}}></Icon>
            </div>
            <Div
              divref={scrollRef}
              className="z-40 flex max-w-5xl overflow-x-scroll flex-nowrap wrap-vertical lg:w-9/12"
              style={{scrollBehavior: 'smooth'}}
              width="80vw"
              onMouseDown={onDragStart}
              onMouseMove={onThrottleDragMove(onDragMove)}
              onMouseUp={onDragEnd}
              onMouseLeave={onDragEnd}>
              <Card imgsrc={dog} hospitalName="병원" locate="주소" />
              <Card imgsrc={choco1} hospitalName="큐티초코병원" locate="주소" />
              <Card imgsrc={choco2} hospitalName="이초코병원" locate="주소" />
              <Card imgsrc={choco3} hospitalName="병원" locate="주소" />
              <Card imgsrc={dog} hospitalName="병원" locate="주소" />
              <Card imgsrc={dog} hospitalName="병원" locate="주소" />
            </Div>
            <div className="lg:hidden">
              <Icon
                name="arrow_forward_ios"
                id="forward"
                style={{fontSize: '60px'}}></Icon>
            </div>
          </div>
        </Div>
      </div>
    )
  }
//)

export default HospitalSection
