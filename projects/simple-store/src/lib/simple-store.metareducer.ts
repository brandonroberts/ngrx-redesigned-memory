import { ActionReducer } from '@ngrx/store';

export function simpleStoreUpdate(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return (state, action) => {
    if (action.type === 'STATE_UPDATE') {
      return (action as any).state;
    }

    const newState = reducer(state, action);

    return newState;
  };
}
