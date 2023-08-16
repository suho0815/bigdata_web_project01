import type {MouseEvent, ReactElement} from 'react'
import {FC, useState, useRef, forwardRef, useImperativeHandle, useEffect} from 'react'
import {Icon, Div, Card, Title} from '../../../components'
import HospitalList from './HospitalList'
import dog from '../../../images/cute-dog.png'
import choco1 from '../../../images/choco1.jpg'
import choco2 from '../../../images/choco2.jpg'
import choco3 from '../../../images/choco3.jpg'

const HospitalSection: React.FC = //forwardRef((props, ref)
  () => {
    const scrollRef = useRef<HTMLDivElement>(null)
    // useImperativeHandle(ref, () => scrollRef.current)
    const [isDrag, setIsDrag] = useState(false)
    const [startX, setStartX] = useState<number | undefined>(0)
    const [topLikeData, setTopLikeData] = useState<ReactElement[]>()
    const [newPost, setNewPost] = useState<any>()
    const [newReply, setNewReply] = useState<any>()

    const onScrollBtnClick = (nextType: 'prev' | 'next') => {
      if (!scrollRef.current) return
      if (nextType === 'prev') {
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollLeft - 335, //scrollRef.current.offsetWidth,
          behavior: 'smooth'
        })
      } else {
        scrollRef.current.scrollTo({
          left: scrollRef.current.scrollLeft + 335, //scrollRef.current.offsetWidth,
          behavior: 'smooth'
        })
      }
    }

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
      }
    }

    useEffect(() => {
      // 인기 게시글
      fetch(`${process.env.REACT_APP_SERVER_URL}/toplike`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          const cardData = data.map((datalist: any, index: number) => (
            <Card
              key={index}
              imgsrc={datalist['imagefile'] ? datalist['imagefile'] : choco1}
              boardName={datalist['title']}
              heart={datalist['likes']}
              views={datalist['views']}
            />
          ))
          setTopLikeData(cardData)
        })
        .catch(err => err.message)

      // 새로운 글
      fetch(`${process.env.REACT_APP_SERVER_URL}/recentpost`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          setNewPost(data)
        })
        .catch(error => error.message)

      // 새로운 댓글
      fetch(`${process.env.REACT_APP_SERVER_URL}/recentreply`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          setNewReply(data)
        })
        .catch(error => error.message)
    }, [])

    return (
      <div className="flex flex-col items-center justify-center w-full h-full p-4">
        <Div className="flex items-center mt-20 mb-10">
          <img src={dog} alt="" className="object-cover w-20" />
          <Title className="ml-8 mr-8">인기 게시글</Title>
          <img src={dog} alt="" className="object-cover w-20" />
        </Div>

        <Div className="relative z-10 p-4 bg-white bg-opacity-50 rounded-lg">
          <div className="flex items-center">
            <div
              className="h-full btn lg:hidden"
              onClick={() => onScrollBtnClick('prev')}>
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
              {topLikeData}
            </Div>
            <div
              className="h-full btn lg:hidden"
              onClick={() => onScrollBtnClick('next')}>
              <Icon
                name="arrow_forward_ios"
                id="forward"
                style={{fontSize: '60px'}}></Icon>
            </div>
          </div>
        </Div>
        {/*  */}
        <Div className="flex mt-8 md:flex-col">
          <div className="mr-8 md:mr-0 md:mb-8">
            <Div className="flex items-center justify-center h-10 font-bold text-white rounded bg-gradient-to-r from-green-200 to-blue-500">
              새로운 글
            </Div>
            <HospitalList newPost={newPost} />
            {/* <button className="w-full border border-blue-500 btn hover:border-blue-500">
              더보기 +
            </button> */}
          </div>
          <div>
            <Div className="flex items-center justify-center h-10 font-bold text-white rounded bg-gradient-to-r from-pink-500 to-yellow-500">
              새로운 댓글
            </Div>
            <HospitalList newReply={newReply} />
            {/* <button className="w-full border border-blue-500 btn hover:border-blue-500">
              더보기 +
            </button> */}
          </div>
        </Div>
      </div>
    )
  }
//)

export default HospitalSection
