
import {Button, Modal, Table} from 'antd'
import { Register } from 'pages/Register/Register';

import '../../shared/css/Table.css'
import { useUserView } from './useUserView';
export const UserVIew = () => {
    const {
        columns, 
        handleCancel,
        handleOk,
        showModal,
        isModalOpen,
        users,
        navigate,
        modalData,
        setModalData
      } =useUserView()

        return (
            <div>
                <Table dataSource={users||[]} columns={columns} pagination={false} rowKey="_id" />
                <Button  onClick={showModal}>
                    Open Modal
                </Button>
                <Button  onClick={()=>navigate('/select')}>
                    Volver
                </Button>
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false} destroyOnClose afterClose={() => setModalData(undefined)}>
                    <Register initialData={modalData || undefined} isEditing={false} />
                </Modal>
            </div>
        )
}