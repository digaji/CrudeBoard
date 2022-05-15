import logo from "../assets/crudeboard-logo.svg";

export default function Navbar(): JSX.Element {
  return (
    <nav className="border-gray-200 bg-transparent px-5 py-3 font-medium">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex">
          <img src={logo} className="h-10 pr-6" alt="logo" />
          <ul className="flex flex-row space-x-2">
            <li>
              <a href="/" className="block border-0 py-2 px-4 text-gray-300 hover:bg-transparent hover:text-white" aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a href="/boards" className="block border-0 py-2 px-4 text-gray-300 hover:bg-transparent hover:text-white">
                Boards
              </a>
            </li>
          </ul>
        </div>
        <ul className="flex flex-row space-x-2">
          <li>
            <a href="/sign-in" className="block border-0 py-2 px-4 text-gray-300 hover:bg-transparent hover:text-white">
              Sign In
            </a>
          </li>
          <li>
            <a
              href="/register"
              className="block rounded border-0 bg-sky-500 py-2 px-4 text-white hover:border-2 hover:border-sky-500 hover:bg-transparent hover:py-[6px] hover:px-[14px]"
            >
              Register
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
