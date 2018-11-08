import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { resultType } from './types.service';
import { ResultService } from './result.service';
import { NGXLogger } from 'ngx-logger';

export enum StorageKeys {
  WALLET = 'wallet',
  SETTINGS = 'settings',
  CONFIG = 'config',
  STATUS = 'status',
  ASSET = 'asset',
  HISTORY = 'history'
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(public storage: Storage, private result: ResultService, private logger: NGXLogger) {}

  processingData(v) {
    if (!v) return null;
    if (typeof v == 'object') return v;
    let parsed;
    try {
      parsed = JSON.parse(v);
    } catch (e) {
      this.logger.error(e);
    }
    return parsed || null;
  }

  async set(key: StorageKeys, value: any): Promise<resultType> {
    try {
      let ret = await this.storage.set(key, value);
      this.logger.debug('set: ', ret);
      return this.result.success(ret);
    } catch (error) {
      throw this.result.error(error);
    }
  }

  async get(key: StorageKeys): Promise<any> {
    try {
      let ret = await this.storage.get(key);
      this.logger.debug('get: ', ret);
      let value = this.processingData(ret);
      return value;
    } catch (error) {
      throw this.result.error(error);
    }
  }

  async remove(key: StorageKeys): Promise<resultType> {
    try {
      let ret = await this.storage.remove(key);
      this.logger.debug('remove: ', ret);
      return this.result.success(ret);
    } catch (error) {
      throw this.result.error(error);
    }
  }
}
