import {FC, useState} from 'react'
import {Icon} from '../../../components'
import {useNavigate} from 'react-router-dom'
//@ts-ignore
import pupp from '../../../images/pupp.mp4'

const SearchSection: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const Navigate = useNavigate()

  const onSearchbtnClicked = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/searchhospital/${searchKeyword}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        Navigate('/api/searchhospital', {state: data})
      })
      .catch(error => error.message)
  }

  const handleInputChange = (event: any) => {
    const value = event.target.value
    setSearchKeyword(value)
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <video
        className="absolute top-0 left-0 object-cover w-full h-screen"
        autoPlay
        loop
        muted>
        <source src={pupp} type="video/mp4" />
      </video>
      <div className="relative z-10 p-6 bg-white bg-opacity-50 rounded-lg">
        <h1 className="text-3xl font-bold">반려동물을 위한 동물 병원을 찾아보세요!</h1>

        <div className="flex p-2 mt-8 overflow-x-hidden bg-white bg-opacity-50 rounded-lg">
          <div className="flex w-full">
            <input
              type="text"
              className="w-11/12 p-2 bg-white bg-opacity-0 rounded-lg"
              placeholder=" 검색"
              onChange={handleInputChange}
            />
            <button
              className="w-1/12 p-2 ml-4 bg-white bg-opacity-50 rounded-lg btn"
              type="submit"
              onClick={onSearchbtnClicked}>
              <Icon name="search" className=""></Icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchSection
