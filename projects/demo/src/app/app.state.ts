export interface BooksState {
  collection: any[];
  loaded: boolean;
}

export interface AppState {
  books: BooksState;
}

export const initialState = {
  books: {
    collection: [{id: 1, name: 'my book'}],
    loaded: true 
  }
};