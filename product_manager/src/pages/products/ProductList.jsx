import axios from 'axios'
import React, { useEffect, useEffect } from 'react'
import { FaPlus, FaQuestionCircle, FaEdit, FaTrash, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

const ProductList = () => {

    const [products, setProducts] = useState([])
    const [selectProduct, setSelectProduct] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [modalSuccessOpen, setModalSuccessOpen] = useState(false)
    const [tooltipOpen, setTooltipOpen] = useState(false)

    useEffect(() => {
        const findProducts = () => {
            axios.get('/products')
                .then(response => {
                    setProducts(response.data)
                })
                .catch(error => {
                    console.error ("Error", error)
                })
        }
        findProducts()
    },[])

    const opningModal = (product) =>{
        setSelectProduct(product)
        setModalOpen(true)
    }

    const closeModal = () => {
        setModalOpen(false)
        setSelectProduct(null)
    }

    const openSuccessModal = () => {
        setModalSuccessOpen(true)
        setTimeout(() => setModalSuccessOpen(false), 2000)
    }

    const removeProduct = () => {
        axios.delete(`/products/${selectProduct.id}`)
            .then(() => {
                setProducts(prevProducts => prevProducts.filter(product => product.id !== selectProduct.id))
                closeModal()
                openSuccessModal()
            })
            .catch(error => {
                console.error("Error:", error)
                closeModal()
            })
    }
    const toogleTooltip = () => {
        setTooltipOpen(!tooltipOpen)
    }

  return (
    <div className="container mt-5">
        <h2 className="mb-4" style={{position: "relative"}}>
            List of Products{''}
            <FaQuestionCircle 
                className="tooltip-icon" 
                onClick={toogleTooltip} />
            {tooltipOpen && (
                <div className="tooltip">
                    Here you can see all the products registered in the system. You can also add, edit and delete products.
                </div>
            )}
        </h2>
        <Link to="/add-products" className="btn btn-primary mb-2">
            <FaPlus className="icon"/> Add Product
        </Link>
        <table className="table">
            <thead>
                <tr>
                    <th>Name:</th>
                    <th>Price:</th>
                    <th>Descrição:</th>
                    <th>Quantity Stock:</th>
                    <th>Supplier:</th>
                    <th>Actions:</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{parseFloat(product.price).toFixed(2)}</td>
                        <td>{product.description}</td>
                        <td>{product.quantityStock}</td>
                        <td>{product.supplier ? product.supplier.name : "Não informado"}</td>
                        <td>
                            <Link to={`/edit-products/${product.id}`} className="btn btn-sm btn-warning">
                                <FaEdit className="icon icon-btn" /> Edit
                            </Link>
                            <button onClick={() => opningModal(product)} className="btn btn-sm btn-danger">
                                <FaTrash className="icon icon-btn" /> Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <Modal 
            isOpen={modalOpen}
            onRequestClose={closeModal}
            className="modal"
            overlayClassName="overlay"
        >
            <div className="modalContent">
                <FaExclamationTriangle className="icon" />
                <h2>Confirm delete</h2>
                <p>Do you want to delete the product?{selectProduct && selectProduct.name}</p>
                <div className="modalButtons">
                    <button onClick={closeModal} className="btn btn-secondary">Cancel</button>
                    <button onClick={removeProduct} className="btn btn-danger">Delete</button>
                </div>
            </div>
        </Modal>

        <Modal
            isOpen={modalSuccessOpen}
            onRequestClose={closeModal}
            className="modal"
            overlayClassName="overlay"
        >    
            <div className="modalContent">
                <FaCheckCircle className="icon successIcon" />
                <h2>Product deleted</h2>
            </div>
        </Modal>
    </div>
  )
}
export default ProductList