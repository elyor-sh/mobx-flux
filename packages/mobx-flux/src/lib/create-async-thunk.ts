import { Dispatch } from "./configure-store";
import { Action } from "./create-slice";

export type ActionCreator<T> = (payload?: T) => {payload: T | undefined, type: string}

function createAction<T>(type: string): ActionCreator<T> {
    return (payload?: T) => ({
        type,
        payload,
    });
}

export type AppThunk<A extends Action = Action, ReturnType = void> = (
    dispatch: Dispatch<A>
) => ReturnType;

export function createAsyncThunk<T, A extends unknown[] = unknown[]>(
    typePrefix: string,
    asyncFunction: (...args: A) => Promise<T>
) {
    const pendingType = `${typePrefix}/pending`;
    const fulfilledType = `${typePrefix}/fulfilled`;
    const rejectedType = `${typePrefix}/rejected`;

    const fulfilledAction = createAction<T>(fulfilledType);
    const pendingAction = createAction(pendingType);
    const rejectedAction = createAction<string>(rejectedType);

    function Thunk(...args: A): AppThunk {
        return async (dispatch: Dispatch): Promise<void> => {
            dispatch(pendingAction());
            try {
                const response = await asyncFunction(...args);
                dispatch(fulfilledAction(response));
            } catch (error: any) {
                dispatch(rejectedAction(error?.message));
            }
        };
    }

    Thunk.fulfilled = fulfilledAction;
    Thunk.pending = pendingAction;
    Thunk.rejected = rejectedAction;

    return Thunk;
}