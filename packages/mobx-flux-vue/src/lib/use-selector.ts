import {inject} from "vue";
import {storeKey} from "./create-store-provider";

export interface TypedUseSelectorHook<TState> {
    <TSelected>(
        selector: (state: TState) => TSelected,
    ): TSelected
    <Selected = unknown>(
        selector: (state: TState) => Selected,
    ): Selected
}

export const useSelector = <State>(
    fn: (state: State) => State[keyof State]
) => {
    const rootStore = inject(storeKey) as {state: State}

    if(!rootStore){
        throw new Error(`Not found store with key ${String(storeKey)}, please provide to app`)
    }

    return fn(rootStore.state as State);
};