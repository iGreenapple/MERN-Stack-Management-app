import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

const RootLayout = () => {
  return (
    <div className="bg-white flex flex-col h-screen items-center">
      <header className="bg-white w-full border-b-4 border-black">
        <NavBar />
      </header>
      <main className="bg-white w-[80%] h-full flex justify-center items-center">
        {/* Do Outlet se vyrenderuje children route element, pokud v daném route tomu nějaký odpovídá*/}
        <Outlet />  
      </main>
    </div>
  )
}

export default RootLayout