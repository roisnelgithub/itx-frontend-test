import Breadcrumb from "./breadcrumb"
import Cart from "./cart"
import Logo from "./logo"

const Header = () => {
  return (
    <div className="w-full px-6 md:px-10 py-4 border-b border-gray-200">
      {/* Container: Logo + Breadcrumb + Cart */}
      <div className="w-full max-w-[1900px] mx-auto flex flex-row justify-between items-start">

        {/* Logo + Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center md:gap-8">
          <Logo />
          <div className="mt-2 md:mt-0">
            <Breadcrumb />
          </div>
        </div>

        {/* Cart */}
        <div className="flex md:items-center justify-end mt-4 md:mt-2 cursor-pointer hover:opacity-80 transition">
          <Cart />
        </div>

      </div>
    </div>
  )
}

export default Header
