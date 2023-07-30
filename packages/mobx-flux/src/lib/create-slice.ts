import {observable, runInAction} from "mobx";
import {ActionCreator} from "./create-async-thunk";

export type Action<T = any> = {
    type: string;
    payload?: T;
};
export type PayloadAction<T> = Required<Action<T>>


export type Reducer<S = any, A extends Action = Action> = (state: S, action: A) => void;

export type ReducersMap<S = any, A extends Action = Action> = {
    [key: string]: Reducer<S, A>;
};

export interface SliceResult<S = any> {
    actions: { [key: string]: (payload?: any) => Action };
    reducer: Reducer<S>;
}

export interface SliceOptions<S = any, A extends Action = Action> {
    name: string;
    initialState: S;
    reducers: ReducersMap<S, A>;
    extraReducers?: (builder: ExtraReducersBuilder<S>) => void;
}

const getOriginalActionName = (string: string | undefined, substring: string) => {
    if(string){
        return string?.replace(substring + '/', '')
    }

    return substring
}
const stickActionName = (name: string , actionName: string | undefined) => name + '/' + (actionName ? actionName : '')

class ExtraReducersBuilder<S> {
    constructor(private reducerMap: Record<string, (state: S, action: Action) => void>) {}

    addCase<P, A>(actionType: ActionCreator<P> | ActionCreator<P>[], reducer: (state: S, action: A) => void): void {

        if(typeof actionType === 'function'){
            this.reducerMap[actionType()?.type] = reducer as Reducer;
        }

        if(Array.isArray(actionType)){
            actionType.forEach((type) => {
                if(typeof type === "function"){
                    this.reducerMap[type()?.type] = reducer as Reducer;
                }
            });
        }
    }
}

export function createSlice<S, A extends Action>({
                                                     name,
                                                     initialState,
                                                     reducers = {},
                                                     extraReducers
                                                 }: SliceOptions<S, A>): SliceResult<S> {

    if (!name) {
        throw new Error('`name` is a required option for createSlice')
    }

    if (
        typeof process !== 'undefined' &&
        process.env.NODE_ENV === 'development'
    ) {
        if (initialState === undefined) {
            console.error(
                'You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`'
            )
        }
    }

    const actions: { [key: string]: (payload?: any) => Action } = {};

    const reducerMap = { ...reducers };

    if (extraReducers) {
        // @ts-ignore
        const builder = new ExtraReducersBuilder<S>(reducerMap);
        runInAction(() => {
            extraReducers(builder);
        })
    }

    // @ts-ignore
    const reducer: Reducer<S> = (state = initialState, action: A) => {

        const observableState = observable({
            value: (state ? state : initialState) || {} as object
        }) as {
            value: S
        }
        const originalActionType = getOriginalActionName(action?.type, name)

        // eslint-disable-next-line no-prototype-builtins
        if (reducerMap.hasOwnProperty(originalActionType)) {
            runInAction(() => {
                reducerMap[originalActionType]?.(observableState.value, action)
            });
        }

        return observableState.value;
    };

    Object.keys(reducerMap).forEach((type) => {
        actions[type] = (payload?: unknown) => ({
            type: stickActionName(name, type),
            payload,
        });
    });

    return {
        actions,
        reducer,
    };
}


