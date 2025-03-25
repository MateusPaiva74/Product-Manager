import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const ProductForm = () => {

  const [product, setProduct] = useState({name:"", price:"", descricao:"", quantityStock: "", supplierId: ""})
  const [supplier, setSupplier] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [modalErrorOpen, setModalErrorOpen] = useState(false)
  const [message, setMessageError] = useState([])
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
  return (
    <div></div>
  )
}

export default ProductForm