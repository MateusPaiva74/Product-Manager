import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../../api'
import { FaQuestionCircle, FaCheckCircle } from 'react-icons/fa'
import Modal from 'react-modal'
import InputMask from 'react-input-mask'

Modal.setAppElement('#root')

const SupplierForm = () => {

  const [suppliers, setSuppliers] = useState({name: '', cnpj: '', email: ''})
  
  const [tooltipOpen, setTooltipOpen] = useState(false)
  
  const [modalOpen, setModalOpen] = useState(false)

  const navigate = useNavigate()
  const {id} = useParams()
  
  const handleSubmit = (event) => {
    event.preventDefault()
    if(id) {
      axios.put(`/suppliers/${id}`, suppliers)
      .then(() => {
        setModalOpen(true)
      })
      .catch(error => console.error("Error: ", error))
    }else {
      axios.post(`/suppliers`, suppliers)
      .then(() => {
        setModalOpen(true)
      })
      .catch(error => console.error("Error: ", error))
    }
  }
  const closeModal = () => {
    setModalOpen(false)
    navigate("/list-suppliers")
  }
  const addOtherSupplier = () => {
    setModalOpen(false)
    setSuppliers({name: '', cnpj: '', email: ''})
  }
  const toogleTooltip = () => 
    {setTooltipOpen(!tooltipOpen)}

  return (
    <div className="form-container">
        <h2 style={{position: 'relative'}}>
        {id ? 'Edit Supplier' : 'Add Supplier'}
        {' '}
        <FaQuestionCircle className="tooltip-icon" onClick={toogleTooltip}/>
        {tooltipOpen && (
          <div className="tooltip">
            {id ? 'Use this form to add or edit a supplier' : 'Use this form to add a supplier'}
          </div>
        )}
        </h2>
        <form onSubmit={handleSubmit} className="fornecedor-form">
          <div className="form-group">
            <label htmlFor="name">Name of Supplier</label>
            <input 
                type="text"
                className="form-control" 
                id="name" 
                name="name"
                value={suppliers.name} 
                onChange={e => setSuppliers({ ...suppliers,name: e.target.value})} 
                required />
          </div>
          <div className="form-group">
            <label htmlFor="cnpj">CNPJ of Supplier</label>
            <InputMask
                        mask="99.999.999/9999-99"
                        className="form-control"
                        id="cnpj"
                        name="cnpj"
                        value={suppliers.cnpj}
                        onChange={e => setSuppliers({ ...suppliers, cnpj: e.target.value })}
                        required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email of Supplier</label>
            <input
               type="email" 
               className="form-control" 
               name="email" 
               id="email" 
               pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
               title="Enter a valid email" 
               value={suppliers.email} 
               onChange={e=> setSuppliers({...suppliers, email: e.target.value})} 
               required
            />
          </div>
          <button type="submit" className="btn-success">
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
            <FaCheckCircle className="icon successIcon" />
           <h2>{id ? 'Supplier update' : 'Supplier add'}</h2>

            <div className="modalButtons">
              <button onClick={closeModal} className="btn-success">Close</button>
              {!id && <button onClick={addOtherSupplier} className="btn-secondary">Add other Supplier</button>}
            </div>
          </div>
        </Modal>
    </div>
  )
}

export default SupplierForm