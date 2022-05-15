import logo from "../assets/crudeboard-logo.svg";

export default function Navbar(): JSX.Element {
  return (
    <nav className="border-gray-200 bg-transparent px-5 py-3 font-medium">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex">
          <img src={logo} className="h-10" alt="logo" />
          <ul className="flex flex-row space-x-2">
            <li>
              <a href="/" className="block border-0 border-gray-100 py-2 pr-4 pl-10 text-gray-300 hover:bg-transparent hover:text-white" aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a href="/boards" className="block border-0 border-gray-100 py-2 px-4 text-gray-300 hover:bg-transparent hover:text-white">
                Boards
              </a>
            </li>
          </ul>
        </div>
        <ul className="flex flex-row space-x-2">
          <li>
            <a href="/sign-in" className="block border-0 border-gray-100 py-2 px-4 text-gray-300 hover:bg-transparent hover:text-white">
              Sign In
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
