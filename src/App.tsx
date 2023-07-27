import Map from './pages/Map'
import Filter from './pages/Filter'
import HospitalList from './pages/HospitalList'
import {Div} from './components'
import {Login, Join} from './pages/Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <main>
      <div className="w-screen h-screen">
        <BrowserRouter>
          <Filter />
          <Routes>
            <Route
              path="/"
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
