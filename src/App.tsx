import Map from './pages/SearchHospital/Map'
import Filter from './pages/SearchHospital/Filter'
import Nav from './pages/Main/Nav'
import SearchSection from './pages/Main/SearchSection'
import HospitalSection from './pages/Main/HospitalSection'
import HospitalList from './pages/SearchHospital/HospitalList'
import {Div} from './components'
import {Login, Join} from './pages/Login'
import Board from './pages/Borad'
import Footer from './pages/Main/Footer'
import CommunitySection from './pages/Main/CommunitySection'
import WriteFree from './pages/Borad/WriteBoard'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {useState} from 'react'
import {CookiesProvider} from 'react-cookie'
import {Provider as ReduxProvider} from 'react-redux'

function App() {
  const [sharedHospital, setSharedHospital] = useState(null)

  const handleDataChange = (data: any) => {
    setSharedHospital(data)
  }

  return (
    <main className="relative w-full min-h-full">
      {/* <ReduxProvider> */}
      <CookiesProvider>
        <div className="w-full h-full">
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route
                path="/"
                element={
                  <section className="w-full h-full">
                    <SearchSection />
                    <HospitalSection />
                    <CommunitySection />
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
              <Route path="/board/:itmes/write" element={<WriteFree />} />
              {/* <Route path="/board/honey/write" element={<WriteHoney />} /> */}
            </Routes>
          </BrowserRouter>
        </div>
        <Footer />
      </CookiesProvider>
      {/* </ReduxProvider> */}
    </main>
  )
}

export default App
