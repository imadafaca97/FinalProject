
import {Button, Table, Modal} from 'antd'
import '../../shared/css/Table.css'
import '../../shared/css/Modal.css'
import { useClientView } from './useClientView';
import { ClientForm } from 'pages/ClientForm/ClientForm';
export const ClientView = () => {
const {
  columns, 
  handleCancel,
  handleOk,
  showModal,
  isModalOpen,
  clients,
  navigate,
  modalData,
  setModalData
} = useClientView()
    
      return (
        <div>

          <Table dataSource={clients||[]} columns={columns} pagination={false} rowKey="_id" />
          <Button  onClick={showModal}>
            Open Modal
          </Button>
          <Button  onClick={()=>navigate('/select')}>
            Volver
          </Button>
          <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false} destroyOnClose afterClose={() => setModalData(undefined)}>
            <ClientForm initialData={modalData||undefined} isEditing={!!modalData} ></ClientForm>
          </Modal>
        </div>
      )
}