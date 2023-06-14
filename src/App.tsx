import {Routes, Route} from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import ServicesPage from './pages/ServicesPage'
import ProfessionalPage from './pages/ProfessionalPage'
import DatePage from './pages/DatePage'
import ReservationPage from './pages/ReservationPage'
import BreadcrumbsWrapper from './components/BreadcrumbsWrapper'
import OrderSuccessPage from './pages/OrderSuccessPage'
import OrderReceiptPage from './pages/OrderReceiptPage'

function App() {


  return (
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='order_confirmation/success' element={<OrderSuccessPage/>}/>
        <Route path='reserved-appointments/:appointment_id' element={<OrderReceiptPage/>}/>
        <Route path='reserve/' element={<BreadcrumbsWrapper/>}>
          <Route path='professional' element={<ProfessionalPage/>}/>
          <Route path='professional/:professional/services' element={<ServicesPage/>}/>
          <Route path='professional/:professional/services/:services/date' element={<DatePage/>}/>
          <Route path='professional/:professional/services/:services/date/:date/time/:time' element={<ReservationPage/>}/>
        </Route>

    </Routes>
  )
}

export default App
