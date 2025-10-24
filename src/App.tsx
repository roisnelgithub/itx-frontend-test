import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Product from './pages/product'
import MainLayout from './components/layouts/main-layout';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Product />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
