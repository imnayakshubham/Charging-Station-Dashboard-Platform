import { Route, Routes } from 'react-router-dom'
import './App.css'
import { AppLayout } from './components/AppLayout/AppLayout'
import { Dashboard } from './components/Dashboard/dashboard'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Dashboard />}></Route>
        </Route>

        <Route path='*' element={<>404</>}></Route>

      </Routes>
    </>
  )
}

export default App
