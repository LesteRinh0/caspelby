import './App.css'
import { Space, Table, Button } from 'antd'
import { dataSource } from './constants/users'
import { useState } from 'react'
import AddModal from './components/add-modal'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
const { Column } = Table

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [newData, setNewData] = useState(dataSource)
  const [currentValue, setCurrentValue] = useState(null)

  const triggerModalOpen = () => {
    setIsOpen((prev) => !prev)
    if (isOpen) setCurrentValue(null)
  }

  const onSubmit = (data) => {
    const newUser = {
      key: String(newData.length + 1),
      name: data.name,
      value: +data.value,
      date: data.date,
    }
    setNewData((newData) => [...newData, newUser])
    triggerModalOpen()
  }

  const onDelete = (key) => () => {
    setNewData((prev) => prev.filter((item) => item.key !== key))
  }

  const onChange = (data) => () => {
    setCurrentValue(data)
    triggerModalOpen()
  }

  const onEdit = (data) => {
    const currentUser = { ...data, value: +data.value }
    setNewData((data) => data.map((item) => (item.key === currentUser.key ? currentUser : item)))
    triggerModalOpen()
  }

  return (
    <div>
      <AddModal
        isModalOpen={isOpen}
        handleCancel={triggerModalOpen}
        onSubmit={currentValue ? onEdit : onSubmit}
        defaultValues={currentValue}
      />
      <Button onClick={triggerModalOpen} className="btn-add">
        Добавить
      </Button>
      <Table dataSource={newData} className="table-settings">
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Value" dataIndex="value" key="value" />
        <Column title="Date" dataIndex="date" key="date" />

        <Column
          title="Action"
          key="action"
          render={(_, data) => (
            <Space size="middle">
              <Button onClick={onChange(data)} shape="circle" icon={<EditOutlined />} />
              <Button onClick={onDelete(data.key)} shape="circle" icon={<DeleteOutlined />} />
            </Space>
          )}
        />
      </Table>
    </div>
  )
}

export default App
