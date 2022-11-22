import { FC } from 'react';
import Homepage from '../pages/Homepage';
import { useStore } from '../store/store';

interface Props {
    children: any
}

const RequireAuth: FC<{ children: React.ReactElement }> = ({ children }: Props) => {
    const { authStore } = useStore(); // Your hook to get login status
 
    if (!authStore.verificarSesion) {
       return <Homepage />;
    }
    return children;
 };

 export default RequireAuth;