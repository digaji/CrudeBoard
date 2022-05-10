import logo from "../assets/crudeboard-logo.svg";

export default function Navbar() {
  return (
    <nav className="bg-crude-blue border-gray-200 px-5 py-3 font-medium">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="flex">
          <img src={logo} className="h-10" alt="logo" />
          <ul className="flex flex-row space-x-2">
            <li>
              <a href="/" className="block py-2 pr-4 pl-10 text-gray-300 border-0 border-gray-100 hover:bg-transparent hover:text-white" aria-current="page">Home</a>
            </li>
            <li>
              <a href="/boards" className="block py-2 px-4 text-gray-300 border-0 border-gray-100 hover:bg-transparent hover:text-white">Boards</a>
            </li>
          </ul>
        </div>
        <ul className="flex flex-row space-x-2">
          <li>
            <a href="/" className="block py-2 px-4 text-gray-300 border-0 border-gray-100 hover:bg-transparent hover:text-white">Log Out</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}