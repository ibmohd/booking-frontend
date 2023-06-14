import {Outlet} from 'react-router-dom'
import BreadcrumbsComponent from './BreadcrumbsComponent'


const BreadcrumbsWrapper = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <BreadcrumbsComponent/>
        <Outlet/>
    </div>
  )
}

export default BreadcrumbsWrapper