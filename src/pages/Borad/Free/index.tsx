import type {FC, ReactElement} from 'react'
import {useState, useEffect, useRef} from 'react'
import {Div} from '../../../components'
import Pagination from '../../SearchHospital/HospitalList/Pagination'
import {FreeBoardItem} from './FreeBoardItem'
import FreeFilter from './FreeFilter'
import {getCookie} from '../../../util'
import {useNavigate} from 'react-router'
import FreeDetailModal from './FreeDetailModal'

const Free = () => {
  const Navigate = useNavigate()

  const [limit, setLimit] = useState<number>(20)
  const [page, setPage] = useState<number>(1)
  const offset: number = (page - 1) * limit
  const [total, setTotal] = useState<number | undefined>(0)
  const [renderedItems, setRenderedItems] = useState<ReactElement[]>([])
  const [userLikeOnBoard, setUserLikeOnBoard] = useState<any>()
  const [viewDetailModal, setViewDetailModal] = useState<boolean>(false)
  const [titleData, setTitleData] = useState<string>('')
  const [freeBoardId, setFreeBoardId] = useState<number>()
  const [heartCnt, setHeartCnt] = useState<number>()
  const [imageFile, setImageFile] = useState<string>()

  const DetailModalClick = (
    title: string,
    freeBoardid: number,
    Heart: number,
    imageFile: string
  ) => {
    setTitleData(title)
    setFreeBoardId(freeBoardid)
    setHeartCnt(Heart)
    setImageFile(imageFile)
    if (viewDetailModal === false) setViewDetailModal(true)
    else setViewDetailModal(false)
  }

  const GetBoardList = async () => {
    const tokenCookie = getCookie('accessJwtToken:')
    if (tokenCookie) {
      const token = tokenCookie.trim()

      const headers = new Headers()
      headers.append('Authorization', token)
      headers.append('Content-Type', 'application/json')
      // 해당 유저가 좋아요 한 목록
      const likeResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/like/free`, {
        method: 'GET',
        headers: headers
      })
      const likeData = await likeResponse.json()

      const likeonFreeBoardId = likeData.map(
        (datalist: any) => datalist['petFreeBoard']['freeBoardId']
      )
      setUserLikeOnBoard(likeonFreeBoardId)

      // 게시글 목록
      const postsResponse = await fetch(`${process.env.REACT_APP_SERVER_URL}/free`, {
        method: 'GET',
        headers: headers
      })
      const postsData = await postsResponse.json()
      console.log(postsData)
      const mapItems = postsData.map((datalist: any, index: number) => (
        <div key={index} className="flex w-1/3 justify-evenly w-responsive-custom">
          <FreeBoardItem
            title={datalist['title']}
            writer={datalist['nickname']}
            date={datalist['regdate']}
            heart={datalist['likes']}
            freeBoardId={datalist['freeBoardId']}
            img={datalist['imageFile']}
            userLikeOnBoard={likeonFreeBoardId}
            onClick={() =>
              DetailModalClick(
                datalist['title'],
                datalist['freeBoardId'],
                datalist['likes'],
                datalist['imageFile']
              )
            }
          />
        </div>
      ))
      // console.log(typeof postsData[1]['imagefile'])
      setTotal(mapItems.length)
      setRenderedItems(mapItems)
    } else {
      Navigate('/')
      alert('로그인이 필요한 서비스입니다.')
    }
  }

  useEffect(() => {
    GetBoardList()
  }, [viewDetailModal])

  return (
    <section className="w-full p-10 mt-8 ">
      <div className="flex flex-col items-center w-full h-full p-10">
        <FreeFilter total={total} />
        <div className="flex flex-wrap justify-center w-full border-y-2 border-mint">
          {userLikeOnBoard && renderedItems}
        </div>
      </div>
      {viewDetailModal && (
        <FreeDetailModal
          onCloseIconClick={() => setViewDetailModal(false)}
          title={titleData}
          freeBoardId={freeBoardId}
          userLikeOnBoard={userLikeOnBoard}
          img={imageFile}
        />
      )}
      <Div>{/* <Pagination/> */}</Div>
    </section>
  )
}

export default Free
