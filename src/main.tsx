import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import Logo from './components/Logo'
import Footer from './components/Footer'
import ScrollToTop from './utility/ScrollToTop'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <ScrollToTop>
        <div className='max-w-screen flex flex-col bg-slate-50'>
          <Logo title='Top Trims'/>
          <App />
          <Footer/>
        </div>
      </ScrollToTop>
    </BrowserRouter>
)
