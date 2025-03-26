import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="menu">
        <div className="logo">
            <Link to="/">
                <img src="/PRODUCT-manager-logo.png" alt="Logo do Sistema" className="logo-img" />
            </Link>
        </div>
        <div className="menu-links">
            <Link to="/add-suppliers">Add Supplier</Link>
            <Link to="/supplier-list"> Supplier List</Link>
            <Link to="/add-products">Add Products</Link>
            <Link to="/products-list">Products List</Link>
        </div>

    </nav>
  )
}

export default Navbar