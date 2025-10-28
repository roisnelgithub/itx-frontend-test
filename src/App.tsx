import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ProductDetailsPage from './features/products/pages/product-details.page';
import ProductPage from './features/products/pages/product.page'
import MainLayout from './components/layouts/main-layout';
import NotFoundPage from './pages/not-found.page';

import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProductPage />} />
          <Route path="/:id" element={<ProductDetailsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
