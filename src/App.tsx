import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar.tsx';
import Inicio from './pages/Inicio.tsx';
import Articulo from './pages/Articulo.tsx';
import Modelo from './pages/Modelo.tsx';
import Marca from './pages/Marca.tsx';

function App() {

  return (
    <>
      <header className=''>
        <Router>
          <nav>
            <Navbar />
            <Routes>
              <Route path="/" element={<Inicio/>} />
              <Route path="/articulo" element={<Articulo/>} />
              <Route path="/modelo" element={<Modelo/>} />
              <Route path="/marca" element={<Marca/>} />
            </Routes>
          </nav>
        </Router>
      </header>
      <main>
        
      </main>
    </>
  )
}

export default App