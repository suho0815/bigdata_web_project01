import Map from './pages/FindHospital/Map'
import Filter from './pages/FindHospital/Filter'
import Nav from './pages/Main/Nav'
import SearchSection from './pages/Main/SearchSection'
import HospitalSection from './pages/Main/HospitalSection'
import HospitalList from './pages/FindHospital/HospitalList'
import {Div} from './components'
import {Login, Join} from './pages/Login'
import Honey from './pages/Borad/Honey'
import Free from './pages/Borad/Free'
import Board from './pages/Borad'
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
                <Div className="relative flex flex-col items-center justify-center w-full pt-28 lg:pt-16">
                  <Filter />
                  <Map className="mb-8" />
                  <HospitalList />
                </Div>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Join />} />
            <Route path="/board/:board1" element={<Board />} />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  )
}

export default App
