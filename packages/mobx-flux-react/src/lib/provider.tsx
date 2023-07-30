import React, {createContext, ReactNode} from "react";
import {Action, Store} from "mobx-flux";

type ProviderProps<Store> = {
    store: Store,
    children: ReactNode
}

export const MobxToolkitContext = createContext<Store<unknown, any> | null>(null)
export const Provider = <S, A extends Action>({store, children}: ProviderProps<Store<S, A>>): ReactNode => {
    return (
        // @ts-ignore
        <MobxToolkitContext.Provider value={store}>
            {children}
        </MobxToolkitContext.Provider>
    )
}