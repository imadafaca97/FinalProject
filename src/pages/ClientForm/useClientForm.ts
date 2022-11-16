import * as Yup from 'yup';
import { useHttp } from '../../shared/hooks/index';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AppManagerContext } from 'core/providers';
import { useQueryClient } from 'react-query';
import { Client, ClientInterface } from '../../shared/interface/index'; 

export const useClientForm = (initialData?: Client, isEditing?: boolean) => {
    const { clientManager } = useContext(AppManagerContext);
    const queryClient = useQueryClient();

    const initialValues: ClientInterface = {
        name: initialData?.name || '',
        lastName: initialData?.lastName || '',
        sex: initialData?.sex ||'',
        address:initialData?.address || '',
        age: initialData?.age ||''
    }
    const formValidations = Yup.object({
        
      })
    const { execute: executeLogin } = useHttp({});

    const handleOnSubmit = (data: ClientInterface) => {
        executeLogin({
            asyncFunction: () => {
                if(isEditing) {
                    return clientManager.updateClient(initialData?._id!, data)
                }
                return clientManager.createClient(data)
            },
            onSuccess: () => queryClient.invalidateQueries('clients'),
            onError: () => toast.error('Usuario no encontrado')
        })
    }
    return {
        initialValues,
        formValidations,
        handleOnSubmit
    }
}