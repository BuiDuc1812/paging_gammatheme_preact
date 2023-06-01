export default function check(totalPage, currentPage) {
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
  return pagesToShow
}
