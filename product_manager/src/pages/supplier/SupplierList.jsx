import React, { useEffect, useState } from 'react'
import axios from '../../api/index'
import { Link } from 'react-router-dom'

const SupplierList = () => {

    const [supplier, setSupplier] = useState([])
  
    useEffect(() => {
        const findSupplier = () =>{
            axios.get('/suppliers')
            .then(response => {
                setSupplier(response.data)
            }).catch(error => {
                console.error("Ocorreu um erro ao buscar os fornecedores", error)
            })
        }
        findSupplier()
    },[])
    return (
    <div className="container mt-5">
        <h2 className="mb-4">List of Suppliers</h2>
        <Link to="/add-suppliers" className="btn btn-primary mb-2">
        <FaPlus className="icon"/> Add Supplier
        </Link>
    </div>
  )
}

export default SupplierList