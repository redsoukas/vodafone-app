export interface Storage {
  setItem(key: string, value: any): any;
  getItem(key: string): any;
  removeItem(key: string): any;
  clear(): any;
}
