import Map from './pages/Map'
import Filter from './pages/Filter'
import HospitalList from './pages/HospitalList'
import {Div} from './components'
import {BrowserRouter} from 'react-router-dom'

function App() {
  return (
    <main>
      <div className="w-screen h-screen">
        <Filter />
        <Div className="flex w-full" height="90%">
          <HospitalList />
          <Map />
        </Div>
      </div>
    </main>
  )
}

export default App
