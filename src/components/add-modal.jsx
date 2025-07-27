import { useState, useEffect } from 'react'
import { Modal, Input } from 'antd'
import validationError from '../validation/validationFunc'
import './add-modal.css'

const DEFAULT_VALUES = {
  key: '',
  name: '',
  value: '',
  date: '',
}

const AddModal = ({ isModalOpen, handleCancel, onSubmit, defaultValues }) => {
  const [formData, setFormData] = useState(DEFAULT_VALUES)
  const [error, setError] = useState(null)

  const handleChangeForm = (key) => (event) => {
    setFormData((prev) => ({ ...prev, [key]: event.target.value }))
  }

  const validateWrap = () => {
    const errorMsg = validationError(formData)
    if (errorMsg) {
      setError(errorMsg)
      return
    }
    onSubmit(formData)
    setFormData(DEFAULT_VALUES)
    setError(null)
  }

  useEffect(() => {
    setFormData(defaultValues || DEFAULT_VALUES)
  }, [defaultValues])

  return (
    <Modal
      title="Заполните поля:"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={validateWrap}
    >
      <Input
        className="input-settings"
        placeholder="Name"
        value={formData.name}
        onChange={handleChangeForm('name')}
      />
      {error?.name && <div>{error.name}</div>}
      <Input
        className="input-settings"
        placeholder="Value"
        value={formData.value}
        onChange={handleChangeForm('value')}
      />
      {error?.value && <div>{error.value}</div>}
      <Input
        className="input-settings"
        placeholder="Date"
        value={formData.date}
        onChange={handleChangeForm('date')}
      />
      {error?.date && <div>{error.date}</div>}
    </Modal>
  )
}
export default AddModal
