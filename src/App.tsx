import { Route, Routes } from "react-router-dom";
import Navbar from "./common/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import "./App.css";

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-gradient-to-b from-crude-blue to-crude-darkBlue">
          <Navbar />
          <Home />
        </div>
      } />
      <Route path="/sign-in" element={
        <div className="min-h-screen bg-gradient-to-b from-crude-blue to-crude-darkBlue">
          <Navbar />
          <SignIn />
        </div>
      } />
    </Routes>
  );
}
