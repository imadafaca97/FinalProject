import * as Yup from 'yup';
import { useHttp } from '../../shared/hooks';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AppManagerContext } from 'core/providers';
import { User, UserInterface } from '../../shared/interface'; 
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
export const useRegister = (initialData?: User, isRegisting?: boolean) => {
    
    const queryClient = useQueryClient();
    const { userManager } = useContext(AppManagerContext);
    const navigate = useNavigate();

    const initialValues: UserInterface = {
        name: initialData?.name || '',
        lastName: initialData?.lastName ||'',
        email: initialData?.email ||'',
        phone: initialData?.phone ||'',
        username: initialData?.username ||'',
        password: '',
        password2: '',
    }
    const formValidations = Yup.object({

      })
    const { execute: executeLogin } = useHttp({});

    const handleOnSubmit = (data: UserInterface) => {
        executeLogin({
            asyncFunction: () => {
                if(isRegisting){
                    navigate('/')
                    return userManager.createUser(data)
                }
                if(initialData){
                    return userManager.updateUser(initialData!._id, data)
                }
                return userManager.createUser(data)
                
            },
            onSuccess: () => queryClient.invalidateQueries('users'),
            onError: () => toast.error('Usuario no encontrado')
        })
    }
    return {
        initialValues,
        formValidations,
        handleOnSubmit
    }
}