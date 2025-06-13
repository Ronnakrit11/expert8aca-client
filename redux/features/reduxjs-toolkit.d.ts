// Type definitions for Redux Toolkit
declare module '@reduxjs/toolkit' {
  export function configureStore(options: any): any;
  export function createSlice(options: any): any;
  export function createAsyncThunk(type: string, payloadCreator: any): any;
  export function createAction(type: string): any;
  export function createReducer(initialState: any, builder: any): any;
  export function createSelector(...args: any[]): any;
  export function createEntityAdapter(options?: any): any;
  export function createApi(options: any): any;
  export function fetchBaseQuery(options: any): any;
  export const combineReducers: any;
  export const compose: any;
  export const applyMiddleware: any;
  
  // Add PayloadAction type
  export interface PayloadAction<P = any, T extends string = string, M = never, E = never> {
    payload: P;
    type: T;
  }
}
