import check from './logic_paging'
export function Paginate({ totalData, perPage, currentPage, onChange, prev, next, last, first }) {
  const totalPage = Math.ceil(totalData / perPage)
  return (
    <div class="mt-3 flex justify-center gap-3">
      <button onClick={() => first()} class={`px-3 ${currentPage === 1 ? 'pointer-events-none' : 'pointer-events-auto'}`}>
        &laquo;
      </button>
      <button onClick={() => prev()} class={`px-3 ${currentPage === 1 ? 'pointer-events-none' : 'pointer-events-auto'}`}>
        &#8249;
      </button>
      {check(totalPage, currentPage).map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          class={`px-3 ${page === currentPage ? 'active border border-solid border-black' : ''} ${page === '...' ? 'pointer-events-none' : ''}`}
        >
          {page}
        </button>
      ))}
      <button onClick={() => next()} class={`px-3 ${currentPage === totalPage ? 'pointer-events-none' : 'pointer-events-auto'}`}>
        &#8250;
      </button>
      <button onClick={() => last(totalPage)} class={`px-3 ${currentPage === totalPage ? 'pointer-events-none' : 'pointer-events-auto'}`}>
        &raquo;
      </button>
    </div>
  )
}
