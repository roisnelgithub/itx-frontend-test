import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Product from './pages/product'
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Product />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
