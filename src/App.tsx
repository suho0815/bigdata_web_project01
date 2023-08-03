import Map from './pages/SearchHospital/Map'
import Filter from './pages/SearchHospital/Filter'
import Nav from './pages/Main/Nav'
import SearchSection from './pages/Main/SearchSection'
import HospitalSection from './pages/Main/HospitalSection'
import HospitalList from './pages/SearchHospital/HospitalList'
import {Div} from './components'
import {Login, Join} from './pages/Login'
import Board from './pages/Borad'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {useState} from 'react'

function App() {
  const [sharedHospital, setSharedHospital] = useState(null)

  const handleDataChange = (data: any) => {
    setSharedHospital(data)
  }

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
                  <Filter onDataChange={handleDataChange} />
                  <Map className="mb-8" sharedHospital={sharedHospital} />
                  <HospitalList sharedHospital={sharedHospital} />
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
