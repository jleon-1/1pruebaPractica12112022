import { useContext, createContext } from "react";
import GeneralStore from "./general-store";
import AuthStore from "./auth-store";

interface Store {
    authStore: AuthStore;
    generalStore: GeneralStore;
}

export const store: Store = {
    authStore: new AuthStore(),
    generalStore: new GeneralStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}