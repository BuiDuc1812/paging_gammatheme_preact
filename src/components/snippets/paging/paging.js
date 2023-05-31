export default function Paginate({ totalData, perPage, currentPage, onChange, prev, next, last, first }) {
  const totalPage = Math.ceil(totalData / perPage)
  const pageNumbers = Array.from({ length: totalPage }, (_, index) => index + 1)
  let pagesToShow = []
  if (totalPage <= 5) {
    pagesToShow = pageNumbers
  } else {
    if (currentPage <= 3) {
      pagesToShow = pageNumbers.slice(0, 5)
      pagesToShow.push('...')
      pagesToShow.push(totalPage)
    } else if (currentPage >= totalPage - 2) {
      pagesToShow = [1, '...']
      pagesToShow = pagesToShow.concat(pageNumbers.slice(totalPage - 4, totalPage))
    } else {
      pagesToShow = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPage]
    }
  }
  return (
    <div class="flex justify-center gap-3">
      <button onClick={() => first(currentPage)} class={currentPage === 1 ? 'pointer-events-none' : 'pointer-events-auto'}>
        &laquo;
      </button>
      <button onClick={() => prev(currentPage)} class={currentPage === 1 ? 'pointer-events-none' : 'pointer-events-auto'}>
        &#8249;
      </button>
      {pagesToShow.map((page) => (
        <button key={page} onClick={() => onChange(page)} class={page === currentPage ? 'active border border-solid border-black' + ' px-3' : 'px-3'}>
          {page}
        </button>
      ))}
      <button onClick={() => next(currentPage)} class={currentPage === totalPage ? 'pointer-events-none' : 'pointer-events-auto'}>
        &#8250;
      </button>
      <button onClick={() => last(totalPage)} class={currentPage === totalPage ? 'pointer-events-none' : 'pointer-events-auto'}>
        &raquo;
      </button>
    </div>
  )
}
