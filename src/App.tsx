import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="text-center">
      <header className="bg-[#282c34] min-h-screen flex flex-col items-center justify-center text-white text-3xl">
        <img src={logo} className="h-[40vmin] animate-[spin_20s_linear_infinite] pointer-events-none" alt="logo" />
        <p className="text-3xl">
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

export default App;
