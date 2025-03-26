import React, { useEffect, useState } from 'react'
import axios from '../../api/index'
import { Link } from 'react-router-dom'
import { FaPlus, FaTrash, FaEdit, FaExclamationTriangle, FaCheckCircle, FaQuestionCircle } from 'react-icons/fa'
import Modal from 'react-modal'


const SupplierList = () => {

    const [supplier, setSupplier] = useState([])
    const [selectedSupplier, setSelectSupplier] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalSuccessOpen, setModalSuccessOpen] = useState(false)
    const [tooltipOpen, setTooltipOpen] = useState(false)
  
    useEffect(() => {
        const findSupplier = () =>{
            axios.get('/suppliers')
            .then(response => {
                setSupplier(response.data)
            })
            .catch(error => {
                console.error("Ocorreu um erro ao buscar os fornecedores", error)
            })
        }
        findSupplier()
    },[])

    const openingModal = (supplier) => {
        setSelectSupplier(supplier)
        setModalOpen(true)
    }
    const closeModal = () => {
        setModalOpen(false)
        setSelectSupplier(null)
    }
    const openSuccessModal = () => {
        setModalSuccessOpen(true)
        setTimeout(() => setModalSuccessOpen(false), 2000)
    }
    const removeSupplier = () => {
        axios.delete(`/suppliers/${selectedSupplier.id}`)
        .then(() => {
            setSupplier(prevSupplier => prevSupplier.filter(supplier => supplier.id !== selectedSupplier.id))
            closeModal()
            openSuccessModal()
        })
    }
    const toogleTooltip = () => {
        setTooltipOpen(!tooltipOpen)
    }

    return (
    <div className="container mt-5">
        <h2 className="mb-4" style={{position:'relative'}}
        >List of Suppliers{' '}
        <FaQuestionCircle className="tooltip-icon" onClick={toogleTooltip} />
        {tooltipOpen && (
            <div className="tooltip">
                <p>Here you can see all the suppliers registered in the system. You can also add, edit and delete suppliers.</p>
            </div>
        )}
        </h2>
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
                            <Link to={`/edit-supplier/${supplier.id}`} className="btn btn-sm btn-warning">
                                <FaEdit className="icon icon-btn"/>Edit
                            </Link>
                            <button onClick={()=>openingModal(supplier)} className="btn btn-sm btn-danger">
                                <FaTrash className="icon icon-btn" />Delete
                            </button>
                        </td>
                    </tr>
                    ))
                    }
            </tbody>
        </table>
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            className="modal"
            overlayClassName="overlay"
        >
            <div className="modalContent">
                <FaExclamationTriangle className="icon"/>
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete the supplier   {selectedSupplier && selectedSupplier.name}?</p>
                <div className="modalButtons">
                    <button onClick={closeModal} className="btn btn-secondary"> Cancel</button>
                    <button onClick={removeSupplier} className="btn btn-danger">Delete</button>
                </div>
            </div>
        </Modal>

        <Modal
            isOpen={modalSuccessOpen}
            onRequestClose={() => setModalSuccessOpen(false)}
            className="modal"
            overlayClassName="overlay"
        >
            <div className="modalContent">
                <FaCheckCircle className="icon successIcon"/>
                <h2>Supplier deleted successfully!</h2>
            </div>
        </Modal>
    </div>
  )
}
export default SupplierList