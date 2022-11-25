import { useContext, createContext } from "react";
import GeneralStore from "./general-store";
import AuthStore from "./auth-store";
import ModalStore from './modal-store';

interface Store {
    authStore: AuthStore;
    generalStore: GeneralStore;
    modalStore: ModalStore;
}

export const store: Store = {
    authStore: new AuthStore(),
    generalStore: new GeneralStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}