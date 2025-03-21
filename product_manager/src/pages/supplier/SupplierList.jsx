import React, { useEffect, useState } from 'react'
import axios from '../../api/index'
import { Link } from 'react-router-dom'
import { FaPlus, FaTrash, FaEdit, FaExclamationTriangle } from 'react-icons/fa'
import Modal from 'react-modal'

const SupplierList = () => {

    const [supplier, setSupplier] = useState([])
    const [selectedSupplier, setSelectSupplier] = useState(null)
    const [openModal, setOpenModal] = useState(false)
  
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

    const modalOpen = (supplier) => {
        setSelectSupplier(supplier)
        setOpenModal(true)
    }
    const closeModal = () => {
        setOpenModal(false)
    }
    const removeSupplier = () => {
        axios.delete(`/suppliers/${selectedSupplier.id}`)
        .then(() => {
            setSupplier(prevSupplier => prevSupplier.filter(supplier => supplier.id))
            closeModal()
        }).catch(error => {
            console.error("Ocorreu um erro ao deletar o fornecedor", error)
        })

    return (
    <div className="container mt-5">
        <h2 className="mb-4">List of Suppliers</h2>
        <Link to="/add-suppliers" className="btn btn-primary mb-2">
        <FaPlus className="icon"/> Add Supplier
        </Link>
        <table className="table">
            <thead>
                <tr>
                    <th>Name:</th>
                    <th>CNPJ:</th>
                    <th>Email:</th>
                    <th>Actions:</th>
                </tr>
            </thead>
            <tbody>
                {supplier.map(supplier => (
                <tr key={supplier.id}>
                    <td>{supplier.name}</td>
                    <td>{supplier.cnpj}</td>
                    <td>{supplier.email}</td>
                    <td>
                        <Link to={`/edit-supplier/${supplier.id}`} className="btn btn-sm btn-warning"><FaEdit className="icon icon-btn"/>Edit
                        </Link>
                        <button onClick={()=>openModal(supplier)} className="btn btn-sm btn-danger"><FaTrash className="icon icon-btn" />Delete
                        </button>
                    </td>
                </tr>))}
            </tbody>
        </table>
        <Modal
            isOpen={openModal}
            onRequestClose={closeModal}
            className="modal"
            overLayClassName="overlay"
        >
            <FaExclamationTriangle className="icon"/>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete the supplier {selectedSupplier && selectedSupplier.name}?</p>
            <div className="modalButtons">
                <button onClick={closeModal} className="btn btn-secondary"> Cancel</button>
            </div>
        </Modal>
    </div>
  )
}
}
export default SupplierList