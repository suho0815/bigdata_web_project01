import type {FC} from 'react'
import {useEffect, useState} from 'react'

export type PaginationProps = {
  total: number
  limit: number
  page: number
  setPage: (page: number) => void
  className?: string
}

const Pagination: FC<PaginationProps> = ({
  total,
  limit,
  page,
  setPage,
  className: _className
}) => {
  const numPages = Math.ceil(total / limit)
  const className = ['btn', 'btn-info', 'text-white', 'text-xl', 'mr-4', _className].join(
    ' '
  )

  const currClassName = [className + 'bg-gray-400'].join(' ')
  const [minPage, setMinPage] = useState<number>(1)
  const [maxPage, setMaxPage] = useState<number>(10)

  // const a =
  //   numPages > maxPage
  //     ? Array(numPages)
  //         .fill(undefined)
  //         .map((_, i) => i)
  //     : Array(numPages)
  //         .fill(undefined)
  //         .map((_, i) => i)

  const [pagearr, setPagearr] = useState<number[]>(
    numPages > maxPage
      ? Array(maxPage + 1)
          .fill(undefined)
          .map((_, i) => i)
      : Array(numPages)
          .fill(undefined)
          .map((_, i) => i)
  )

  console.log(numPages)
  console.log(maxPage)
  console.log(minPage)
  console.log(pagearr)
  let pagear: any[] = []
  useEffect(() => {
    const lessThanMax = page + 5 > maxPage && page >= 5
    console.log('lessThanMax : ', lessThanMax)
    lessThanMax ? setMaxPage(page + 5) : setMaxPage(numPages >= 10 ? maxPage : 10)
    const moreThanMin = page - 5 > minPage
    moreThanMin ? setMinPage(page - 5) : setMinPage(minPage)
    let temparr: number[] = []
    console.log(numPages)
    if (numPages > 0) {
      for (let i = minPage; i <= maxPage; i++) {
        temparr.push(i)
      }
    }
    setPagearr(temparr)
    console.log(pagearr)
    pagear = pagearr.map((_, i) => (
      <button
        className={page === i + 1 ? currClassName : className}
        key={i + 1}
        onClick={() => {
          setPage(i + 1)
        }}
        aria-current={page === i + 1 ? 'page' : undefined}>
        {i + 1}
      </button>
    ))

    // setPagearr(pagearr.slice(minPage, maxPage + 1))
  }, [page])

  return (
    <nav className="flex justify-center mt-8 ">
      <button
        className={className}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}>
        &lt;
      </button>
      {pagear}
      <button
        className={className}
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}>
        &gt;
      </button>
    </nav>
  )
}

export default Pagination
