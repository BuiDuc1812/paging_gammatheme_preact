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

async function getData(page, perPage, totalData) {
  try {
    const response = await fetch(apiUrl + `?per_page=${perPage}&page=${page}`)
    const data = await response.json()
    const itemsToShow = page === Math.ceil(totalData / perPage) ? totalData % perPage : perPage
    return data.slice(0, itemsToShow)
  } catch (error) {
    console.log(error)
  }
}

console.log(countData())
const App = () => {
  const [totalData, setTotalData] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [dataItems, setDataItems] = useState([])
  useEffect(async () => {
    setTotalData(await countData())
  }, [])

  useEffect(async () => {
    setDataItems(await getData(currentPage, perPage, totalData))
  }, [currentPage])

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
