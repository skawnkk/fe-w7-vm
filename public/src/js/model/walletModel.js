import Observable from '../observer';

class WalletModel extends Observable {
  constructor(myMoney) {
    super();
    this.walletMoney = myMoney;
  }
  notify(data) {
    this._observers.forEach((observer) => {
      observer();
    });
  }
}

export default WalletModel;
