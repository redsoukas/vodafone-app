import { Injectable } from '@angular/core';
import { Storage } from './storage.model';

@Injectable()
export class StorageService {
  private storage: any;
  public constructor(
  ) {
   this.storage = window.localStorage;
  }

  public put(key: string, value: any): void {
    this.storage.setItem(key, value);
  }

  public get(key: string): any {
    return this.storage.getItem(key);
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }

  public clear(): void {
    this.storage.clear();
  }

  public getStorage(): Storage {
    return this.storage;
  }
}
