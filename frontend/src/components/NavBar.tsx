import { NavLink } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const NavBar = () => {
  const { isAuthenticated, toggleLoginModal, toggleRegisterModal, handleLogout } = useAuth();

  return (
    <nav className='w-full flex justify-between items-center py-5 top-0'>
      <NavLink to="/" className='logo font-medium text-dark text-4xl ml-7'>Project | M</NavLink>
      <ul className='flex justify-end gap-6 mr-8'>
        <NavLink className='logo text-lg' to="/dashboard">Dashboard |</NavLink>
        <NavLink className='logo text-lg' to="/about">About |</NavLink>
        <div className='flex justify-end gap-6'>
          <button className='logo text-lg' onClick={handleLogout}>Logout |</button>
          {/* <button className='logo text-lg' onClick={toggleLoginModal}>Login |</button>
          <button className='logo text-lg' onClick={toggleRegisterModal}>Register |</button> */}
        </div>
      </ul>
    </nav>
  )
}

export default NavBar