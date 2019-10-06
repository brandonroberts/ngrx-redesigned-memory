import { NgModule, ModuleWithProviders } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { SimpleStoreService } from './simple-store.service';
import { INITIAL_STATE } from '@ngrx/store';
import { simpleStoreUpdate } from './simple-store.metareducer';

@NgModule({
  imports: [
    StoreModule.forRoot({}, {
      metaReducers: [simpleStoreUpdate]
    })
  ]
})
export class SimpleStoreModule {
  constructor(store: Store<any>) {
    SimpleStoreService.store = store;
  }

  static forRoot(config: {
    initialState?: any
  } = {}): ModuleWithProviders<SimpleStoreModule> {
    return {
      ngModule: SimpleStoreModule,
      providers: [
        { provide: INITIAL_STATE, useValue: config.initialState }
      ]
    }
  }
}
