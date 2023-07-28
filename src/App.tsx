import Map from './pages/FindHospital/Map'
import Filter from './pages/FindHospital/Filter'
import Nav from './pages/Main/Nav'
import Section1 from './pages/Main/Section1'
import Section2 from './pages/Main/Section2'
import HospitalList from './pages/FindHospital/HospitalList'
import {Div} from './components'
import {Login, Join} from './pages/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <main>
      <div className="w-screen h-screen">
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route
              path="/"
              element={
                <section>
                  <Section1 />
                  <Section2 />
                </section>
              }
            />
            <Route
              path="/find"
              element={
                <Div
                  className="relative flex flex-col items-center justify-center w-full top-28"
                  height="100%">
                  <Filter />
                  <Map className="mb-8" />
                  <HospitalList />
                </Div>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  )
}

export default App
