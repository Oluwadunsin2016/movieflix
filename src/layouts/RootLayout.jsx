import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
const RootLayout = () => {
  return (
    <div className='text-white min-h-screen'>
           <Navbar/>
     <Outlet/>
    </div>
  )
}

export default RootLayout