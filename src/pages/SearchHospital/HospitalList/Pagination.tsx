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
  const [limitPage, setLimitPage] = useState<number>(10)
  const [pagearr, setPagearr] = useState(
    numPages > limitPage
      ? Array(limitPage)
          .fill(undefined)
          .map((_, i) => i)
      : Array(numPages)
          .fill(undefined)
          .map((_, i) => i)
  )

  useEffect(() => {
    const lessThanFive = page + 5 > limitPage
    lessThanFive ? setLimitPage(page + 5) : setLimitPage(numPages)
    setPagearr(pagearr.slice(page - 5, limitPage))
  }, [page])

  return (
    <nav className="flex justify-center mt-8 ">
      <button
        className={className}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}>
        &lt;
      </button>
      {pagearr.map((_, i) => (
        <button
          className={page === i + 1 ? currClassName : className}
          key={i + 1}
          onClick={() => {
            setPage(i + 1)
          }}
          aria-current={page === i + 1 ? 'page' : undefined}>
          {i + 1}
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
