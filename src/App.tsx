import { Route, Routes } from "react-router-dom";
import Navbar from "./common/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Boards from "./pages/Boards";
import { Cookies } from "react-cookie";
import "./App.css";

export default function App(): JSX.Element {
  const cookies = new Cookies();

  return (
    <Routes>
      {/* Home route */}
      <Route path="/" element={
        <div className="app">
          <Navbar cookies={cookies}/>
          <Home cookies={cookies} />
        </div>
      } />
      {/* Sign In route */}
      <Route path="/sign-in" element={
        <div className="app">
          <Navbar cookies={cookies}/>
          <SignIn cookies={cookies}/>
        </div>
      } />
      {/* Register route */}
      <Route path="/register" element={
        <div className="app">
          <Navbar cookies={cookies}/>
          <Register />
        </div>
      } />
      {/* Boards route */}
      <Route path="/boards" element={
        <div className="app">
          <Navbar cookies={cookies}/>
          <Boards cookies={cookies}/>
        </div>
      } />
      {/* 404 Error unknown route */}
      <Route path="*" element={
      <div className="app">
        <Navbar cookies={cookies}/>
        <NotFound />
      </div>
      } />
    </Routes>
  );
}
