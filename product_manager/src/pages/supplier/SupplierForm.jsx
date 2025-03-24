import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaQuestionCircle } from 'react-icons/fa'

const SupplierForm = () => {

  const [suppliers, setSuppliers] = useState({name: '', cnpj: '', email: ''})
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const {id} = useParams()
  const toogleTooltip = () => 
    setTooltipOpen(!tooltipOpen)

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
        <form className="fornecedor-form">
          <div className="form-group">
            <label htmlFor="name">Name of Supplier</label>
            <input type="text" className="form-control" id="name" value={suppliers.name} onChange={e => setSuppliers({ ...suppliers,name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label htmlFor="cnpj">CNPJ of Supplier</label>
            
          </div>
          <div className="form-group">
            <label htmlFor="email">Email of Supplier</label>
            <input type="text" className="form-control" name="email" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Enter a valid email" value={suppliers.email} onChange={e=> setSuppliers({...suppliers, email: e.target.value})} required/>
          </div>
          <button type="submit" className="btn-sucess">
            {id ? 'Edit' : 'Add'}
          </button>
        </form>
    </div>
  )
}

export default SupplierForm