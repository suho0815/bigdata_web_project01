import Map from './pages/Map'
import Filter from './pages/Filter'
import Nav from './pages/Main/Nav'
import Section1 from './pages/Main/Section1'
import Section2 from './pages/Main/Section2'
import HospitalList from './pages/HospitalList'
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
                <Div className="flex w-full" height="90%">
                  <HospitalList />
                  <Map />
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
