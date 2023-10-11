import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav className='w-full flex justify-between items-center py-5 top-0'>
      <NavLink to="/" className='logo font-medium text-black text-4xl ml-7'>Project | M</NavLink>
      <ul className='flex justify-end gap-6 mr-8'>
        <NavLink className='logo text-lg' to="/dashboard">Dashboard |</NavLink>
        <NavLink className='logo text-lg' to="/test">About |</NavLink>
        <NavLink className='logo text-lg' to="/">Login |</NavLink>
      </ul>
    </nav>
  )
}

export default NavBar