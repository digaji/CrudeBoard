import { Cookies } from "react-cookie";
import logo from "../assets/crudeboard-logo.svg";
import kanban from "../assets/crudeboard-kanban.webp";
import indicator from "../assets/crudeboard-indicator.webp";
import placeholder from "../assets/crudeboard-placeholder.webp";

function ContentFeature() {
  return (
    <>
      <h1 className="text-4xl font-medium">Happy Family Presents</h1>
      <img src={logo} alt="CrudeBoard Logo" className="my-12 w-2/5" />
      <div className="relative flex w-3/5 items-center py-5">
        <div className="flex-grow border-t border-gray-200"></div>
        <span className="mx-4 flex-shrink font-medium">Features</span>
        <div className="flex-grow border-t border-gray-200"></div>
      </div>
      <div className="mx-32 mt-5 grid grid-flow-col grid-cols-3 items-center justify-items-center gap-3">
        <img src={kanban} alt="Kanban Board" className="col-start-1 transition-all hover:scale-105" />
        <h3 className="col-start-1 my-5 text-2xl font-medium">Kanban Board</h3>
        <img src={indicator} alt="Mask Indicator" className="col-start-2 transition-all hover:scale-110" />
        <h3 className="col-start-2 my-5 text-2xl font-medium ">Mask Indicator</h3>
        <img src={placeholder} alt="Placeholder" className="col-start-3 transition-all hover:scale-105" />
        <h3 className="col-start-3 my-5 text-2xl font-medium">Admin Panel</h3>
      </div>
    </>
  );
}

export default function Home(props: { cookies: Cookies }): JSX.Element {
  const isLoggedIn = props.cookies.get("sessionId");

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-3xl text-white">
        <h1 className="mb-5">Hello, {isLoggedIn ? "User" : "Guest"}!</h1>
        {isLoggedIn ? "Welcome Back" : <ContentFeature />}
      </div>
    </div>
  );
}
