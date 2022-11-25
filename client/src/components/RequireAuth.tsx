import { FC } from 'react';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import { useStore } from '../store/store';

interface Props {
    children: any
}

const RequireAuth: FC<{ children: React.ReactElement }> = ({ children }: Props) => {
    const { authStore } = useStore(); // Your hook to get login status
 
    if (!authStore.verificarSesion) {
       return <Login />;
    }
    return children;
 };

 export default RequireAuth;