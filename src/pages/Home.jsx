import logo from "../assets/crudeboard-logo.svg";
import Navbar from "../common/Navbar";

export default function Home() {
  return (
    <div className="text-center">
      <Navbar />
      <header className="bg-[#282c34] min-h-screen flex flex-col items-center justify-center text-white text-3xl">
        <img src={logo} className="h-[20vmin] pointer-events-none" alt="logo"/>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="underline text-sky-300"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
