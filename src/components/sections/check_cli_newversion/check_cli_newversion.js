import { render } from 'preact'
import './check_cli_newversion.css'
import { select } from '@/components/helpers/dom'
import { useEffect, useState } from 'preact/hooks'

function countData() {
  return fetch('https://api.punkapi.com/v2/beers')
    .then((response) => response.json())
    .then((data) => data.length)
    .catch((error) => {
      console.log(error)
    })
}

function getData(page, perPage, totalData) {
  return fetch(`https://api.punkapi.com/v2/beers?per_page=${perPage}&page=${page}`)
    .then((respon) => respon.json())
    .then((data) => {
      if (page === Math.ceil(totalData / perPage)) {
        const itemsToShow = totalData % perPage
        return data.slice(0, itemsToShow)
      } else {
        return data
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

function MyComponent({ data }) {
  return (
    <div class="grid grid-cols-3 gap-6">
      {data.map((beer) => (
        <div class="text-center" key={beer.id}>
          <div class="beer-image relative h-0 pb-[100%]">
            <img class="absolute left-1/2 h-full -translate-x-1/2" src={beer.image_url} alt="" />
          </div>
          <div class="beer-des">
            <span>
              {beer.name}-{beer.tagline}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

function Paginate({ totalData, perPage, currentPage, onChange, prev, next, last, first }) {
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

const App = () => {
  const [totalData, setTotalData] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 3
  const [dataItems, setDataItems] = useState([])
  useEffect(() => {
    countData().then((data) => {
      setTotalData(data)
    })
  })
  useEffect(() => {
    getData(currentPage, perPage, totalData).then((data) => {
      setDataItems(data)
    })
  }, [currentPage])
  const changeCurrentPage = (page) => {
    setCurrentPage(page)
  }
  const nextIndex = (page) => {
    setCurrentPage(page + 1)
  }
  const prevIndex = (page) => {
    setCurrentPage(page - 1)
  }
  const lastIndex = (page) => {
    setCurrentPage(page)
  }
  const firstIndex = (page) => {
    setCurrentPage((page = 1))
  }
  return (
    <>
      <MyComponent data={dataItems} />
      <Paginate
        totalData={totalData}
        perPage={perPage}
        currentPage={currentPage}
        onChange={changeCurrentPage}
        prev={prevIndex}
        next={nextIndex}
        last={lastIndex}
        first={firstIndex}
      />
    </>
  )
}

render(<App />, select('#data_api', document))
