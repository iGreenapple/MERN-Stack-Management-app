import { Outlet } from "react-router-dom"
import NavBar from "../NavBar"

const RootLayout = () => {
  return (
    <div className="bg-light flex flex-col h-screen items-center">
      <header className="bg-light w-full border-b-4 border-dark">
        <NavBar />
      </header>
      <main className="bg-light w-[80%] h-full flex justify-center items-center">
        {/* The children route element is rendered to the Outlet if there is a corresponding element in the route*/}
        <Outlet />  
      </main>
    </div>
  )
}

export default RootLayout