import * as Yup from 'yup';
import { useHttp } from '../../shared/hooks';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AppManagerContext } from 'core/providers';
import { LoginInterface, User } from '../../shared/interface'; 
import { useNavigate } from 'react-router-dom';
export const useLogin = () => {
    const { userManager } = useContext(AppManagerContext);
    const navigate = useNavigate();

    const initialValues = {
        username: '',
        password: '',
    }
    const formValidations = Yup.object({
        username: Yup.string().required('Este campo es requerido'),
        password: Yup.string().required('Este campo es requerido'),
      })
    
    const handleRegister =() => {
        return navigate('/register')
    }
    const { execute: executeLogin } = useHttp({});

    const handleOnSubmit = (data: LoginInterface) => {
        executeLogin({
            asyncFunction: () => userManager.login(data),
            onSuccess: (res: User) => {
                if(res.username){
                    return navigate('/select')
                }
                return toast.error('Usuario no encontrado')
                
            },
            onError: () => toast.error('Usuario no encontrado')
        })
    }
    return {
        initialValues,
        formValidations,
        handleOnSubmit,
        handleRegister,
        navigate,

    }
}