import { ResultService } from "./result.service";
import { WalletService } from "./wallet.service";
import { ProfileService } from "./profile.service";
import { NetworkService } from "./network.service";
import { NGXLogger } from 'ngx-logger';
import { paymentType, resultType } from "./types.service";
import { Injectable } from "@angular/core";
import _ from "lodash";

type eventType = {
  eventName: string;
  message: any;
  error?: resultType;
};

@Injectable({
  providedIn: 'root',
})

export class JSApiService {
  constructor(
    private network: NetworkService,
    private profile: ProfileService,
    private walletClient: WalletService,
    private result: ResultService,
    private logger: NGXLogger
  ) {
    this.initEventListener();
  }

  private initEventListener() {
    window.addEventListener("message", event => {
      // 拒绝本域内事件
      if (event.origin == window.location.protocol + "//" + window.location.host) return;
      var eventName = event.data.eventName;
      var message = event.data.message;
      switch (eventName) {
        case "address":
          {
            let addr = this.getAddress();
            let data: eventType = {
              eventName: eventName,
              message: {
                address: addr
              }
            };
            this.postEvent(event, data);
          }
          break;
        case "payment":
          {
            this.pay(message, (response, error) => {
              if (error) {
                let data: eventType = {
                  eventName: eventName,
                  message: null,
                  error: error
                };
                this.postEvent(event, data);
                return;
              }
              let data: eventType = {
                eventName: eventName,
                message: {
                  unit: response
                }
              };
              this.postEvent(event, data);
            });
          }
          break;
        default:
          {
            let data: eventType = {
              eventName: eventName,
              message: null,
              error: this.result.error(`${eventName} event does not exist`)
            };
            this.postEvent(event, data);
          }
          break;
      }
    });
  }

  private postEvent(event: MessageEvent, message: any) {
    let domain = event.source;
    domain.postMessage(message, event.origin);
  }

  private getAddress() {
    this.logger.info(this.profile.wallet.address);
    return this.profile.wallet.address;
  }

  private pay(data: paymentType, onDone: (response: any, error: any) => void) {
    if (!onDone || !_.isFunction(onDone)) return;
    try {
      if (!data) throw this.result.error("Parameter cannot be empty");
      if (!data.payer) throw this.result.error("Payer cannot be empty");
      if (data.payer != this.profile.wallet.address)
        throw this.result.error("The payer is not in the wallet");
      if (!data.outputs || _.isEmpty(data.outputs))
        throw this.result.error("Outputs cannot be empty");
      if (!_.isArray(data.outputs)) throw this.result.error("Outputs must be array");
      data.outputs.forEach(item => {
        if (!item.address || !this.walletClient.isValidAddress(item.address))
          throw this.result.error("Invalid address");
        if (!item.amount || !_.isNumber(item.amount))
          throw this.result.error("Amount must be number");
        if (item.amount < 0) throw this.result.error("Amount must be positive");
      });
    } catch (error) {
      onDone(null, error);
      return;
    }

    this.network.transfer(data).subscribe(
      response => {
        let textToSign = response.data.b64_to_sign;
        let sigData = {
          txid: response.data.txid,
          sig: ""
        };
        let walletPrivkey = this.profile.wallet.privkey;
        this.walletClient
          .sign(textToSign, walletPrivkey)
          .then(sig => {
            sigData.sig = sig;
            this.network.submitSig(sigData).subscribe(
              response => {
                this.logger.info(response);
                onDone(response.data.unit.unit, null);
              },
              error => {
                this.logger.info(error);
                onDone(null, this.result.error(error));
              }
            );
          })
          .catch(error => {
            onDone(null, this.result.error(error));
          });
      },
      error => {
        this.logger.info(error);
        onDone(null, this.result.error(error));
      }
    );
  }
}
