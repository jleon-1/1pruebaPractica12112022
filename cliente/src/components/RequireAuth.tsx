import { FC } from 'react';
import HomePage from '../pages/HomePage';
import { useStore } from '../store/store';

interface Props {
    children: any
}

const RequireAuth: FC<{ children: React.ReactElement }> = ({ children }: Props) => {
    const { authStore } = useStore(); // Your hook to get login status
 
    if (!authStore.verificarSesion) {
       return <HomePage />;
    }
    return children;
 };

 export default RequireAuth;