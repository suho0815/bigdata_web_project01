import Map from './pages/Map'
import Filter from './pages/Filter'
import HospitalList from './pages/HospitalList'

function App() {
  return (
    <div className="w-screen h-screen">
      <Filter />
      <div className="flex w-full h-5/6">
        <HospitalList />
        <Map />
      </div>
    </div>
  )
}

export default App
