import { Cookies } from "react-cookie";

export default function Home(props: { cookies: Cookies }): JSX.Element {
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-3xl text-white">
        <h1>Hello, {props.cookies.get("sessionId") ? "User" : "Guest"}!</h1>
      </div>
    </div>
  );
}
