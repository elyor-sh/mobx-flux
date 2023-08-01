import {inject} from "vue";
import {storeKey} from "./create-store-provider";
import type {Store} from "mobx-flux";

export const useDispatch = <Dispatch>(): Dispatch => {

    type RootState = ReturnType<Store<any, any>['getState']>

    const store = inject(storeKey) as {state: RootState, dispatch: any}

    if (!store || !store.dispatch) {
        throw new Error(`Not found store with key ${String(storeKey)}, please provide to app`)
    }

    return store.dispatch as Dispatch;
};