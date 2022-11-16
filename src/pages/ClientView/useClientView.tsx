import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { useHttp } from '../../shared/hooks';
import  {Client} from '../../shared/interface';
import { ColumnsType } from 'antd/lib/table';
import { AppManagerContext } from 'core/providers';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useCallback, useContext, useMemo, useState } from 'react';

export const useClientView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalData, setModalData] = useState<Client> ();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { clientManager } = useContext(AppManagerContext);

  const showModalEdit = (record?: Client) => {
    setModalData(record)
    setIsModalOpen(true);
  };


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { isLoading: isLoadingGetClients, execute: executeGetClients } = useHttp({});

  const { data: clients = [], isLoading: isLoadingClients } = useQuery(
    'clients',
    () => clientManager.getClients(),
  );

  const handleDelete = useCallback(
    (id: string) => {
      executeGetClients({
        asyncFunction: () => clientManager.deleteClient(id),
        onSuccess: () => queryClient.invalidateQueries('clients')
      })
    },
    [clientManager, executeGetClients, queryClient],
  )


    const columns: ColumnsType<Client> = useMemo(
      () => [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Apellido',
          dataIndex: 'lastName',
          key: 'lastName',
        },
        {
          title: 'Sexo',
          dataIndex: 'sex',
          key: 'sex',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'action',
          dataIndex: 'action',
          key: 'action',
          render: (_text: string, record: Client) => (
            <div>
              <DeleteOutlined
                style={{ fontSize: '24px', marginRight: '10px' }}
                onClick={() => handleDelete(record._id)}
              />
              <EditOutlined
                style={{ fontSize: '24px', marginLeft: '10px' }}
                role="button"
                onClick={() => showModalEdit(record)}
              />
            </div>
          ),
        },
      ], [handleDelete])
      return {
        columns, 
        clients,
        handleCancel,
        handleOk,
        showModal,
        isModalOpen,
        isLoadingGetClients,
        navigate,
        isLoadingClients,
        modalData,
        setModalData
      }
}