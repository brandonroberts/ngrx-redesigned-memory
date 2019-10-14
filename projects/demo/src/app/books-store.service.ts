import { Injectable } from '@angular/core';
import { SimpleStoreService } from 'simple-store';
import { AppState } from './app.state';

@Injectable({
  providedIn: 'root'
})
export class BooksStoreService extends SimpleStoreService<AppState> {

}
