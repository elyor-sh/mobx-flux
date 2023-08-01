import {Context, useContext} from "react";
import {Store} from "mobx-flux";

import {MobxToolkitContext} from "./provider";

export const useDispatch = <Dispatch>(): Dispatch => {
    const store = useContext(MobxToolkitContext as Context<Store<unknown, any>>)

    if (!store || !store.dispatch) {
        throw new Error('useDispatch must be used within a CreateStoreProvider');
    }

    return store.dispatch as Dispatch;
};