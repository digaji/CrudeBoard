import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

function App():JSX.Element {
  return (
    <Routes>
      <Route path="/" element={
        <div>
          <Home />
        </div>
      } />
    </Routes>
  );
}

export default App;