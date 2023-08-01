import Map from './pages/FindHospital/Map'
import Filter from './pages/FindHospital/Filter'
import Nav from './pages/Main/Nav'
import SearchSection from './pages/Main/SearchSection'
import HospitalSection from './pages/Main/HospitalSection'
import HospitalList from './pages/FindHospital/HospitalList'
import {Div} from './components'
import {Login, Join} from './pages/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <main>
      <div className="w-full h-screen">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route
              path="/"
              element={
                <section>
                  <SearchSection />
                  <HospitalSection />
                </section>
              }
            />
            <Route
              path="/api/searchhospital"
              element={
                <Div className="relative flex flex-col items-center justify-center w-full pt-28 md:pt-16">
                  <Filter />
                  <Map className="mb-8" />
                  <HospitalList />
                </Div>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Join />} />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  )
}

export default App
