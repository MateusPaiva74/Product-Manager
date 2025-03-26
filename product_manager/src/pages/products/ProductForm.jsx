import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Modal from 'react-modal'
import {FaCheckCircle,FaExclamationTriangle, FaQuestionCircle} from 'react-icons/fa'

Modal.setAppElement('#root')

const ProductForm = () => {

  const [product, setProduct] = useState({name:"", price:"", descricao:"", quantityStock: "", supplierId: ""})
  const [supplier, setSupplier] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalErrorOpen, setModalErrorOpen] = useState(false)
  const [messageError, setMessageError] = useState([])
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    axios.get('/suppliers')
      .then(response => {
        setSupplier(response.data)
      })
      .catch(error => console.error("Error", error))
      
      if(id){
        axios.get(`/products/${id}`)
          .then(response => {
            setProduct({...response.data,supplierId : response.data.supplier ? response.data.supplier.id : ""})
          })
          .catch(error => console.error("Error", error))
      }else{
        setProduct({name:"", price:"", descricao:"", quantityStock: "", supplierId: ""})
      }
  }, [id])

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessageError([])

    const priceFormated = parseFloat(product.price).toFixed(2)
    const productData = { ...product, price: priceFormated }
    const request = id
      ? axios.put(`/products/${id}`, productData)
      : axios.post('/products', productData)

      request.then(() => {
        setModalOpen(true)
      }).catch(error => {
        if(error.response && error.response.data){
          setMessageError(Object.values(error.response.data))
          setModalErrorOpen(true)
        } else{
          console.error("Error", error)
        }
      })
  }
  const handlePriceChange = (event) => {
    let value = event.target.value
    value = value.replace(',', '.')
    value = value.replace(/[ˆ0-9.]/g, '')
    if (value.includes(',')){
      const [partInt, partDecimal] = value.split(',')
      value = partInt + ',' + (partDecimal ? partDecimal.slice(0, 2): '')
    }
    setProduct({...product, price: value})
  }
  const closeModal =() => {
    setModalOpen(false)
    navigate('/products-list')
  }
  const closeModalError = () => {
    setModalErrorOpen(false)
  }
  const addOtherProduct = () => {
    setModalOpen(false)
    setProduct({name: '', price:'',descricao:'',quantityStock:'',supplierId:''})
  }
  const toggleTooltip = () => {
    setTooltipOpen(!tooltipOpen)
  }
  return (
    <div className="form-container">
      <h2 style={{position:'relative'}}>
        {id? 'Edit Product' : 'Add Product'}{''}
        <FaQuestionCircle 
            className="tooltip-icon" 
            onClick={toggleTooltip}/>
        {tooltipOpen && (
          <div className="tooltip">
            {id ? 'Use this form to edit a product' : 'Use this form to add a product'}
          </div>
        )}
      </h2>
      <form onSubmit={handleSubmit} className="fornecedor-form">
        <div className="form-group">
          <label htmlFor="name">Name of Product</label>
          <input 
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={product.name}
              onChange={e => setProduct({...product, name: e.target.value})}
              required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price of Product:</label>
          <input 
              type="text"
              className="form-control"
              id="price"
              name="price"
              value={product.price}
              onChange={handlePriceChange}
              required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Description of product:</label>
          <input 
              type="text"
              className="form-control"
              id="descricao"
              name="descricao"
              value={product.descricao}
              onChange={e => setProduct({...product, descricao: e.target.value})}
              required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantityStock">Quantity of Stock</label>
          <input 
              type="text"
              className="form-control"
              id="quantityStock"
              name="quantityStock"
              value={product.quantityStock}
              onChange={e => setProduct({...product, quantityStock: e.target.value})}
              required
          />
        </div>
        <div className="form-group">
          <label htmlFor="supplierId">Supplier</label>
          <select 
              className="form-control" 
              name="supplierId" 
              id="supplierId" 
              value={product.supplierId} 
              onChange={e => setProduct({...product, supplierId: e.target.value})}
              required
          >
            <option value="">Select a supplier</option>
            {supplier.map(supplier => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
        <button 
            type="submit"
            className="btn-success">
              {id ? 'Edit' : 'Add'}
            </button>
      </form>
      <Modal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          className="modal"
          overlayClassName="overlay"
      >
        <div className="modalContent">
          <FaCheckCircle className="icon-check"/>
          <h2>{id ? 'Product Update successfully' : 'Product Add successfully '}</h2>
          <div className="modalButtons">
            <button onClick={closeModal} className="btn-success">Close</button>
            {!id && <button onClick={addOtherProduct} className="btn-secondary">Add Other Product</button>}
          </div>
        </div>
      </Modal>
        
        <Modal
            isOpen={modalErrorOpen}
            onRequestClose={closeModalError}
            className="modal"
            overlayClassName="overlay"
        >
          <div className="modalContent">
            <FaExclamationTriangle className="icon-errorIcon"/>
            <h2>Error:</h2>
              {messageError.map((message, index) => (
                <h4 key={index}>{message}</h4>
              ))}
            <button onClick={closeModalError} className="btn-secondary">Close</button>
          </div>
        </Modal>
    </div>
  )
}

export default ProductForm