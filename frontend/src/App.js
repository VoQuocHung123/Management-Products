import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import SideBar from './components/Sidebar';
import OverlayProvider from './context/OverlayContext';
import Product from './pages/Product/Product';
import ProductManage from './pages/ProductManage/ProductManage';
import UpdateProductManage from './pages/ProductManage/UpdateProductManage';

function App() {
  return (
    <OverlayProvider>
      <Router>
        <Header />
        <SideBar />
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/danh-sach-sp" element={<Product />} />
          <Route path="/quan-ly-sp" element={<ProductManage />} />
          <Route path="/quan-ly-sp/update-product" element={<UpdateProductManage />} />
          <Route path="*" element={<Product />} />
        </Routes>
      </Router>
      <ToastContainer />
    </OverlayProvider>
  );
}

export default App;
