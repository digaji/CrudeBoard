import logo from "../assets/crudeboard-logo.svg";
import { Cookies } from "react-cookie";
import axios from "axios";
import { backendUrl } from "../misc/Constants";
import { useState } from "react";
import Camera from "./Camera";

function LogOut(props: { cookies: Cookies }) {
  return (
    <li>
      <a
        href="/"
        onClick={async (e) => {
          e.preventDefault();
          const axiosApp = axios.create({
            baseURL: backendUrl,
            withCredentials: true,
            headers: {
              sessionid: props.cookies.get("sessionId"),
            },
          });
          // Remove sessionId cookie from db
          await axiosApp.post("/auth/signout", {}).then((response) => {
            console.log(response);
          });
          props.cookies.remove("sessionId"); // Remove sessionId cookie from browser
          props.cookies.remove("isAdmin"); // Remove isAdmin cookie from browser
          window.location.assign("/"); // Refresh browser and redirect to home page
        }}
        className="block border-0 py-2 px-4 text-gray-300 underline-offset-[6px] transition-all duration-300 hover:bg-transparent hover:text-white hover:underline"
      >
        Log Out
      </a>
    </li>
  );
}

function SignInAndRegister() {
  return (
    <>
      <li>
        <a
          href="/sign-in"
          className="block border-0 py-2 px-4 text-gray-300 underline-offset-[6px] transition-all duration-300 hover:bg-transparent hover:text-white hover:underline"
        >
          Sign In
        </a>
      </li>
      <li>
        <a
          href="/register"
          className="block rounded border-0 bg-sky-500 py-2 px-4 text-white transition-colors duration-300 hover:border-2 hover:border-sky-500 hover:bg-transparent hover:py-[6px] hover:px-[14px]"
        >
          Register
        </a>
      </li>
    </>
  );
}

function Admin() {
  return (
    <li>
      <a
        href="admin"
        className="block border-0 py-2 px-4 text-gray-300 underline-offset-4 transition-all duration-300 hover:bg-transparent hover:text-white hover:underline"
      >
        Admin Panel
      </a>
    </li>
  );
}

export default function Navbar(props: { cookies: Cookies }): JSX.Element {
  const isLoggedIn = props.cookies.get("sessionId");
  const isAdmin = props.cookies.get("isAdmin") === "true";
  const [isMaskOn, setIsMaskOn] = useState(props.cookies.get("maskOn") === "true");

  return (
    <nav className="border-gray-200 bg-transparent px-5 py-3 font-medium">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex">
          <img src={logo} className="h-10 pr-6" alt="logo" />
          <Camera cookies={props.cookies} setIsMaskOn={setIsMaskOn} />
          <ul className="flex flex-row space-x-2">
            <li>
              <a
                href="/"
                className="block border-0 py-2 px-4 text-gray-300 underline-offset-4 transition-all duration-300 hover:bg-transparent hover:text-white hover:underline"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/boards"
                className="block border-0 py-2 px-4 text-gray-300 underline-offset-4 transition-all duration-300 hover:bg-transparent hover:text-white hover:underline"
              >
                {isLoggedIn ? "Boards" : "Demo Board"}
              </a>
            </li>
            {isAdmin ? <Admin /> : null}
          </ul>
        </div>
        <ul className="flex flex-row space-x-2">
          <li>
            <div className={`my-3 mx-4 block h-4 w-4 rounded-lg drop-shadow-md ${isMaskOn ? "bg-green-500" : "bg-red-500"}`}></div>
          </li>
          {isLoggedIn ? <LogOut cookies={props.cookies} /> : <SignInAndRegister />}
        </ul>
      </div>
    </nav>
  );
}
