export function ShowData({ data }) {
  return (
    <div class="grid grid-cols-3 gap-6">
      {data.map((beer) => (
        <div class="text-center" key={beer.id}>
          <div class="beer-image relative h-0 pb-[100%]">
            <img class="absolute left-1/2 h-full -translate-x-1/2" src={beer.image_url} alt="" />
          </div>
          <div class="beer-des bg-yellow-200 mt-2">
            <span>
              {beer.name}-{beer.tagline}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
