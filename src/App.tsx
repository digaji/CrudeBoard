import { Route, Routes } from "react-router-dom";
import Navbar from "./common/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Boards from "./pages/Boards";
import "./App.css";

export default function App(): JSX.Element {
  return (
    <Routes>
      {/* Home route */}
      <Route path="/" element={
        <div className="app">
          <Navbar />
          <Home />
        </div>
      } />
      {/* Sign In route */}
      <Route path="/sign-in" element={
        <div className="app">
          <Navbar />
          <SignIn />
        </div>
      } />
      {/* Register route */}
      <Route path="/register" element={
        <div className="app">
          <Navbar />
          <Register />
        </div>
      } />
      {/* Boards route */}
      <Route path="/boards" element={
        <div className="app">
          <Navbar />
          <Boards />
        </div>
      } />
      {/* 404 Error unknown route */}
      <Route path="*" element={
      <div className="app">
        <Navbar />
        <NotFound />
      </div>
      } />
    </Routes>
  );
}
