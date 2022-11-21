import { useContext, createContext } from "react";
import GeneralStore from "./general-store";
import AuthStore from "./auth-store";
import { UsuarioStore } from "./usuario-store";

interface Store {
    authStore: AuthStore;
    generalStore: GeneralStore;
    usuarioStore: UsuarioStore;
}

export const store: Store = {
    authStore: new AuthStore(),
    generalStore: new GeneralStore(),
    usuarioStore: new UsuarioStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}