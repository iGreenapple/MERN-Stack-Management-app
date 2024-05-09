import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

const RootLayout = () => {
  return (
    <div className="bg-light flex flex-col h-screen items-center">
      <header className="bg-light w-full border-b-4 border-dark">
        <NavBar />
      </header>
      <main className="bg-light w-[80%] h-full flex justify-center items-center">
        {/* Do Outlet se vyrenderuje children route element, pokud v daném route tomu nějaký odpovídá*/}
        <Outlet />  
      </main>
    </div>
  )
}

export default RootLayout