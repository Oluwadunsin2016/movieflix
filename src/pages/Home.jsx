import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import WatchingShows from '../components/WatchingShows'
import SearchedMovies from '../components/SearchedMovies'
// import requests from '../Request'

const Home = () => {
  return (
    <div>
    <Main/>
    {/* <Row title="Latest Movies" fetchUrl={requests.requestLatest}/> */}
<div className='mx-6 md:mx-12 lg:mx-16 xl:mx-20 2xl:mx-24 py-8'>
  <SearchedMovies/>
  <WatchingShows/>
<Row rowId="1" title="Latest Nollywood Movies" query="nollywood full movie 2025" />
<Row rowId="2" title="Latest Bollywood Movies" query="bollywood full movie 2025" />
<Row rowId="3" title="Latest Hollywood Movies" query="hollywood full movie 2025" />
<Row rowId="4" title="Latest Ghallywood Movies" query="ghana full movie 2025" />
<Row rowId="5" title="Latest Tollywood (Telugu) Movies" query="telugu full movie 2025" />
<Row rowId="6" title="Latest Kollywood (Tamil) Movies" query="tamil full movie 2025" />
<Row rowId="7" title="Latest Lollywood (Pakistani) Movies" query="pakistani full movie 2025" />
<Row rowId="8" title="Latest Korean Movies" query="korean full movie 2025" />
<Row rowId="9" title="Latest Chinese Movies" query="chinese full movie 2025" />
<Row rowId="10" title="Latest Japanese Movies" query="japanese full movie 2025" />
<Row rowId="11" title="Latest Thai Movies" query="thai full movie 2025" />
<Row rowId="12" title="Latest Pinoy (Philippines) Movies" query="filipino full movie 2025" />
<Row rowId="13" title="Latest Indonesian Movies" query="indonesian full movie 2025" />
<Row rowId="14" title="Latest French Movies" query="french full movie 2025" />
<Row rowId="15" title="Latest Spanish Movies" query="spanish full movie 2025" />
<Row rowId="16" title="Latest Turkish Movies" query="turkish full movie 2025" />
</div>
    </div>
  )
}

export default Home