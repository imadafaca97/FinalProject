import { useNavigate } from 'react-router-dom';
export const useOptions = () => {
    const navigate = useNavigate();
    const handleClient =() => {
        return navigate('/client')
    }
    const handleUser =() => {
        return navigate('/user')
    }
    const handleLogOut =() => {
        return navigate('/')
    }
    return {
        handleClient,
        handleUser,
        handleLogOut,
    }
}