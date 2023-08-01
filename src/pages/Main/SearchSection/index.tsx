import {FC, useState} from 'react'
import {Icon} from '../../../components'
//@ts-ignore
import pupp from '../../../images/pupp.mp4'

const SearchSection: React.FC = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const onSearchbtnClicked = () => {}

  const handleInputChange = (event: any) => {
    const value = event.target.value
    console.log(value)
    setSearchKeyword(value)
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <video
        className="absolute top-0 left-0 object-cover w-full h-full"
        autoPlay
        loop
        muted>
        <source src={pupp} type="video/mp4" />
      </video>
      <div className="relative z-10 p-6 bg-white bg-opacity-50 rounded-lg">
        <h1 className="text-3xl font-bold">당신을 위한 동물 병원을 찾아보세요!</h1>

        <div className="flex p-2 mt-8 overflow-x-hidden bg-white bg-opacity-50 rounded-lg">
          <form
            action={`http://10.125.121.183:8080/api/searchhospital/${searchKeyword}`}
            className="flex w-full">
            <input
              type="text"
              className="w-11/12 p-2 bg-white bg-opacity-0 rounded-lg"
              placeholder=" 검색"
              onChange={handleInputChange}
            />
            <button
              className="w-1/12 p-2 ml-4 bg-white bg-opacity-50 rounded-lg btn"
              type="submit">
              <Icon name="search" className=""></Icon>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SearchSection
