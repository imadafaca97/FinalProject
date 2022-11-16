import {
    EditOutlined,
    DeleteOutlined,
  } from '@ant-design/icons';
import {  useHttp } from '../../shared/hooks';
import {  User } from '@shared/interface';
import { ColumnsType } from 'antd/lib/table';
import { AppManagerContext } from 'core/providers';
import { useCallback, useContext, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
  export const useUserView = () => {

    const queryClient = useQueryClient();

    const navigate = useNavigate();
    const [modalData, setModalData] = useState<User> ();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { userManager } = useContext(AppManagerContext);

    
    const { data: users = [], isLoading: isLoadingUsers } = useQuery(
      'users',
      () => userManager.getUsers(),
    );

    const { execute: executeGetUsers } = useHttp({});



    const handleDelete = useCallback(
        (id: string) => {
          executeGetUsers({
            asyncFunction: () => userManager.deleteUser(id),
            onSuccess: () => queryClient.invalidateQueries('users')
          })
        },
        [executeGetUsers, queryClient, userManager],
      )

    const showModal = () => {
      setIsModalOpen(true);
    };
    const showModalEdit = (record?: User) => {
      setModalData(record)
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    
      const columns: ColumnsType<User> = useMemo(
        () => [
          {
            title: 'Nombre',
            dataIndex: 'name',
            align: 'center',
            key: 'name',
          },
          {
            title: 'Apellido',
            dataIndex: 'lastName',
            align: 'center',
            key: 'lastName',
          },
          {
            title: 'email',
            dataIndex: 'email',
            align: 'center',
            key: 'email',
          },
          {
            title: 'Telefono',
            dataIndex: 'phone',
            align: 'center',
            key: 'phone',
          },
          {
            title: 'Nombre de usuario',
            dataIndex: 'username',
            align: 'center',
            key: 'username',
          },
          {
            title: 'action',
            align: 'center',
            dataIndex: 'action',
            key: 'action',
            render: (_text: string, record: User) => (
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
            handleCancel,
            handleOk,
            showModal,
            isModalOpen,
            users,
            isLoadingUsers,
            navigate,
            modalData,
            showModalEdit,
            setModalData,
        }
  }