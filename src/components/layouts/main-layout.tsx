import { Outlet } from "react-router-dom"
import Header from "../shared/header-app/header"

const MainLayout = () => {
  return (
    <div>
      <Header />
      <main className="flex-1 w-full max-w-[1900px] mx-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout