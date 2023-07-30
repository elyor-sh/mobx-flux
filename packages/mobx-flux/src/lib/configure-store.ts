import {Action, Reducer} from "./create-slice";

export type Middleware<S, A extends Action> = (store: Store<S, A>) => (next: Dispatch<A>) => (action: A) => unknown;

export type Dispatch<A extends Action = Action> = (action: A) => void

export type Store<S, A extends Action> = {
    getState: () => S;
    dispatch: Dispatch<A>;
    subscribe: (listener: () => void) => () => void
};

export type ConfigureStoreOptions< S, A extends Action> = {
    reducer: {
        [K in keyof S]: Reducer<S[K], A>
    };
    middleware?: Middleware<S, A>[];
    initialState?: S;
};

export function configureStore<S, A extends Action>(options: ConfigureStoreOptions<S, A>): Store<S, A> {
    const { reducer, middleware = [], initialState  } = options;

    let currentState = initialState as S;
    const listeners: (() => void)[] = [];

    const getState = (): S => {
        return currentState
    };

    let dispatch: Dispatch<A> = async (action: unknown) => {
        const reducerKey = Object.keys(reducer)

        for (const key of reducerKey){
            const act = typeof  action === 'function' ? await action(dispatch) : action

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const result = reducer[key as keyof typeof reducer](currentState?.[key], act) as keyof S;

            if(!currentState){
                currentState = {
                    [key]: result
                } as S
            }else {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                currentState[key as keyof S] = result
            }

        }
        listeners.forEach((listener) => listener());
    };

    const subscribe = (listener: () => void): (() => void) => {
        listeners.push(listener);
        return () => {
            const index = listeners.indexOf(listener);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        };
    };

    middleware.reverse().forEach((middlewareFn) => {
        const next = dispatch;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dispatch = middlewareFn({
            getState,
            dispatch: next,
        });
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch({} as A);

    return {
        getState,
        dispatch,
        subscribe,
    };
}