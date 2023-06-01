import { render } from 'preact'
import './check_cli_newversion.css'
import { select } from '@/components/helpers/dom'
import { useEffect, useState } from 'preact/hooks'
import { Paginate } from '../../snippets/paging/paging'
import { ShowData } from './group_items'

const apiUrl = 'https://api.punkapi.com/v2/beers'
const perPage = 3

async function countData() {
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    return data.length
  } catch (error) {
    console.log(error)
  }
}

async function getData(page, perPage) {
  try {
    const response = await fetch(apiUrl + `?per_page=${perPage}&page=${page}`)
    const data = await response.json()
    const totalData = await countData()
    const itemsToShow = page === Math.ceil(totalData / perPage) ? totalData % perPage : perPage
    return data.slice(0, itemsToShow)
  } catch (error) {
    console.log(error)
  }
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

const App = () => {
  const [totalData, setTotalData] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [dataItems, setDataItems] = useState([])
  useEffect(async () => setTotalData(await countData()))
  useEffect(async () => setDataItems(await getData(currentPage, perPage)), [currentPage])
  const changeCurrentPage = (page) => setCurrentPage(page)
  const nextIndex = (page) => setCurrentPage(page + 1)
  const prevIndex = (page) => setCurrentPage(page - 1)
  const firstIndex = (page) => setCurrentPage((page = 1))
  return (
    <>
      <ShowData data={dataItems} />
      <Paginate
        totalData={totalData}
        perPage={perPage}
        currentPage={currentPage}
        onChange={changeCurrentPage}
        prev={prevIndex}
        next={nextIndex}
        last={changeCurrentPage}
        first={firstIndex}
      />
    </>
  )
}

render(<App />, select('#data_api', document))
