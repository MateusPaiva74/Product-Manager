import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SupplierList from './pages/supplier/SupplierList'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SupplierList/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App