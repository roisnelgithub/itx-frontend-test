import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ProductPage from './pages/product.page'
import MainLayout from './components/layouts/main-layout';
import './index.css';
import ProductDetailsPage from './pages/product-details.page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProductPage />} />
          <Route path="/:id" element={<ProductDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
