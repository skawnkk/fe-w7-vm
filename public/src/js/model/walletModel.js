import Observable from '../observer';

class WalletModel extends Observable {
  constructor(myMoney) {
    super();
    this.walletMoney = myMoney;
  }
  getWalletMoney() {
    return this.walletMoney
  }
  setWalletMoney(money) {
    this.walletMoney = money;
  }
}

export default WalletModel;