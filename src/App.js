import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Enquiries from './pages/Enquiries';
import BlogList from './pages/BlogList';
import BlogCatList from './pages/BlogCatList';
import Oder from './pages/Oder';
import Customers from './pages/Customers';
import ProductList from './pages/ProductList';
import BrandList from './pages/BrandList';
import CategoryList from './pages/CategoryList';
import AddBlog from './pages/AddBlog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/forgot-password' element={<ForgotPassword />}/>
        <Route path='/reset-password' element={<ResetPassword />}/>
        <Route path='/admin' element={<MainLayout />}>
          <Route index element={<Dashboard />}/>
          <Route path='enquiries' element={<Enquiries />}/>
          <Route path='blog' element={<AddBlog />}/>
          <Route path='blog-list' element={<BlogList />}/>
          <Route path='blog-category-list' element={<BlogCatList />}/>
          <Route path='orders' element={<Oder />}/>
          <Route path='customers' element={<Customers />}/>
          <Route path='product-list' element={<ProductList />}/>
          <Route path='brand-list' element={<BrandList />}/>
          <Route path='category-list' element={<CategoryList />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
