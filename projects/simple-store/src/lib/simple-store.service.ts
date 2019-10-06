import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

export type StateUpdate<T> = (state: T) => Partial<T>;

@Injectable({
  providedIn: 'root',
})
export class SimpleStoreService<T> {
  static store: Store<any>;

  protected getStore(): Store<T> {
    return SimpleStoreService.store;
  }

  protected setStore(store: Store<T>) {
    SimpleStoreService.store = store;
  }

  get<T>(...paths: string[]) {
    return this.getStore().select<T>(...paths);
  }

  protected getState(): T {
    let snapshot: T | undefined;

    this.getStore()
      .pipe(
        map(st => JSON.parse(JSON.stringify(st))),
        take(1)
      )
      .subscribe(state => (snapshot = state))
      .unsubscribe();

    return snapshot as T;
  }

  protected setState(
    stateOrStateUpdate: Partial<T> | StateUpdate<T>,
    action?: Action
  ) {
    const currentState = this.getState();
    const state =
      typeof stateOrStateUpdate === 'function'
        ? stateOrStateUpdate(currentState)
        : stateOrStateUpdate;

    this.getStore().dispatch({
      type: 'STATE_UPDATE',
      action,
      update: state,
      state: { ...currentState, ...state },
    });
  }
}
