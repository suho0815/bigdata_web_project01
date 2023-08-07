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
  const [maxPage, setMaxPage] = useState<number>(Math.min(numPages, 10))

  // console.log('minPage: ', minPage)
  // console.log('maxPage: ', maxPage)
  // console.log('page: ', page)

  useEffect(() => {
    if (numPages <= 10) {
      setMinPage(1)
      setMaxPage(numPages)
    } else {
      const halfMax = Math.floor(10 / 2)

      if (page <= halfMax) {
        setMinPage(1)
        setMaxPage(10)
      } else if (page > halfMax && page + halfMax <= numPages) {
        setMinPage(page - halfMax)
        setMaxPage(page + halfMax)
      } else {
        setMinPage(numPages - 9)
        setMaxPage(numPages)
      }
    }
  }, [page, numPages])

  const pageNumbersToShow =
    numPages !== 0
      ? Array.from({length: maxPage - minPage + 1}, (_, i) => i + minPage)
      : Array(10).map((_, i) => i)

  return (
    <nav className="flex justify-center mt-8 ">
      <button
        className={className}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}>
        &lt;
      </button>

      {pageNumbersToShow.map(pageNumber => (
        <button
          className={page === pageNumber ? currClassName : className}
          key={pageNumber}
          onClick={() => {
            setPage(pageNumber)
          }}
          aria-current={page === pageNumber ? 'page' : undefined}>
          {pageNumber}
        </button>
      ))}

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
