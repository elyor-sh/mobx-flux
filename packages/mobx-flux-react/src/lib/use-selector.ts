import {Context, useContext} from "react";
import {Action, Store} from "mobx-flux";
import {MobxToolkitContext} from "./provider";

export interface TypedUseSelectorHook<TState> {
    <TSelected>(
        selector: (state: TState) => TSelected,
    ): TSelected
    <Selected = unknown>(
        selector: (state: TState) => Selected,
    ): Selected
}

type Selector<S, R> = (state: S) => R;

export function useSelector<S, R extends Action>(
    selector: Selector<S, R>
): R {

    const store = useContext(MobxToolkitContext as Context<Store<S, R>>)

    if(!store){
        throw new Error(`Wrap component on a Provider and pass the store to Provider`)
    }

    const data = store.getState()

    return selector(data)

}
