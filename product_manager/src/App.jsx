import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SupplierList from './pages/supplier/SupplierList'
import Navbar from './components/NavBar'
import SupplierForm from './pages/supplier/SupplierForm'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<SupplierList/>}/>
      <Route path="/supplier-list" element={<SupplierList/>}/>
      <Route path="/add-suppliers" element={<SupplierForm/>}/>
      <Route path="/edit-supplier/:id" element={<SupplierForm/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App