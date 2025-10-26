import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ProductPage from './pages/product.page'
import MainLayout from './components/layouts/main-layout';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<ProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
