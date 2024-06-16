// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Articulo from './pages/Articulo';
import Modelo from './pages/Modelo';
import Marca from './pages/Marca';
import './App.css';

function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/articulo/*" element={<Articulo />} />
          <Route path="/modelo/*" element={<Modelo />} />
          <Route path="/marca/*" element={<Marca />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;