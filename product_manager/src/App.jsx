import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SupplierList from './pages/supplier/SupplierList'
import Navbar from './components/NavBar'
import SupplierForm from './pages/supplier/SupplierForm'
import ProductList from './pages/products/ProductList'
import ProductForm from './pages/products/ProductForm'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<SupplierList/>}/>
      <Route path="/supplier-list" element={<SupplierList/>}/>
      <Route path="/add-suppliers" element={<SupplierForm/>}/>
      <Route path="/edit-supplier/:id" element={<SupplierForm/>}/>
      <Route path="/products-list" element={<ProductList/>}/>
      <Route path="/add-products" element={<ProductForm/>}/>
      <Route path="/edit-product/:id" element={<ProductForm/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App