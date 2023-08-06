import type {App} from 'vue'
import type {Action, Store} from "mobx-flux";

export const storeKey = Symbol("mobx-flux-store");

export const createStoreProvider = <S, A extends Action>(store: Store<S, A>) => {

    return {
        install: (app: App) => {
            app.provide<{ state: S, dispatch: any }>(storeKey, {state: store.getState(), dispatch: store.dispatch});
        },
    };
};