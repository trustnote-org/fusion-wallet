import { ProfileService } from './profile.service';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { NGXLogger } from 'ngx-logger';
import { ResponseType, configType } from './types.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  httpOptions: any;
  restfulUrl: string;
  miniAppUrl: string;
  constructor(private api: ApiService, private profile: ProfileService, private logger: NGXLogger) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
      }),
      responseType: 'json'
    };
    if (this.profile.config.network === 'testnet') {
      this.restfulUrl = this.profile.config.restAPI_dev;
      this.miniAppUrl = this.profile.config.miniAppUrl_dev;
    } else {
      this.restfulUrl = this.profile.config.restAPI;
      this.miniAppUrl = this.profile.config.miniAppUrl;
    }
  }

  // 登陆注册
  public login(data: any, option = this.httpOptions): Observable<ResponseType> {
    this.logger.info('login: ', data);
    return this.api.post(this.restfulUrl, 'account/register', data, option);
  }

  // 转账
  public transfer(data: any, option = this.httpOptions): Observable<ResponseType> {
    this.logger.info('transfer: ', data);
    return this.api.post(this.restfulUrl, 'asset/transfer', data, option);
  }

  // 提交签名
  public submitSig(data: any, option = this.httpOptions): Observable<ResponseType> {
    this.logger.info('submitSig: ', data);
    return this.api.post(this.restfulUrl, 'asset/sign', data, option);
  }

  // 获取余额
  public getBalance(
    address: any,
    asset: string = 'TTT',
    option = this.httpOptions
  ): Observable<ResponseType> {
    this.logger.info('getBalance: ', address, asset);
    return this.api.get(this.restfulUrl, 'asset/balance/' + address + '/' + asset, null, option);
  }

  // 获取交易历史
  public getHistory(
    address: string,
    asset: string,
    start: number,
    end: number,
    option = this.httpOptions
  ): Observable<ResponseType> {
    this.logger.info('getHistory: ', address, asset, start, end);
    return this.api.get(
      this.restfulUrl,
      `asset/txhistory/${address}/${asset}/${start}/${end}`,
      option
    );
  }

  /*
  // 获取交易历史
  public getHistory(
    address: string,
    asset: string,
    start: number,
    end: number,
    option = this.httpOptions
  ): Observable<ResponseType> {
    this.logger.info("getHistory: ", address, asset, start, end);
    return this.api.get(
      this.restfulUrl,
      `query/readabletxs/${address}/${asset}/${start}/${end}`,
      option
    );
  }
  */

  public getMiniApp(): Observable<any> {
    this.logger.info('getMiniApp: ');
    return this.api.get(this.miniAppUrl, `apps`);
  }
}
