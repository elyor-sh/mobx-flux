import type {App} from 'vue'
import type {Action, Store} from "mobx-flux";
import {reactive} from "vue";

export const storeKey = Symbol("mobx-flux-store");

export const createStoreProvider = <S, A extends Action>(store: Store<S, A>) => {

    const rootStore = reactive<{ state: S }>({
        state: store.getState(),
    }) as {state: S};

    return {
        install: (app: App) => {
            app.provide<{ state: S, dispatch: any }>(storeKey, {state: rootStore.state, dispatch: store.dispatch});

            // store.subscribe(() => {
            //     rootStore.state = store.getState();
            // });
        },
    };
};