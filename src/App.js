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
import AddBlogCat from './pages/AddBlogCat';
import Category from './pages/Category';
import AddBrand from './pages/AddBrand';
import AddProduct from './pages/AddProduct';
import Color from './pages/Color';
import ColorList from './pages/ColorList';
import AddCoupon from './pages/AddCoupon';
import CouponList from './pages/CouponList';

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
          <Route path='coupon' element={<AddCoupon />}/>
          <Route path='coupon/:id' element={<AddCoupon />}/>
          <Route path='coupon-list' element={<CouponList />}/>
          <Route path='blog-category' element={<AddBlogCat />}/>
          <Route path='blog-category/:id' element={<AddBlogCat />}/>
          <Route path='blog-category-list' element={<BlogCatList />}/>
          <Route path='orders' element={<Oder />}/>
          <Route path='customers' element={<Customers />}/>
          <Route path='product' element={<AddProduct />}/>
          <Route path='product-list' element={<ProductList />}/>
          <Route path='brand' element={<AddBrand />}/>
          <Route path='brand/:id' element={<AddBrand />}/>
          <Route path='brand-list' element={<BrandList />}/>
          <Route path='category' element={<Category />}/>
          <Route path='category/:id' element={<Category />}/>
          <Route path='category-list' element={<CategoryList />}/>
          <Route path='color' element={<Color />}/>
          <Route path='color/:id' element={<Color />}/>
          <Route path='color-list' element={<ColorList />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
