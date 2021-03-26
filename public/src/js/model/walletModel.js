import Observable from '../observer';

class WalletModel extends Observable {
  constructor(myMoney) {
    super();
    this.walletMoney = myMoney;
  }
  getWalletMoney() {
    return this.walletMoney;
  }
  setWalletMoney(money) {
    this.walletMoney = money;
  }
  setWalletStatusMinus(money) {
    this.walletMoney = this.walletMoney.map((moneyBtn) => {
      if (moneyBtn.type === money) moneyBtn.count--;
      return moneyBtn;
    });
    this.notify(); //옵저버 호출
  }

  setReturnMoneyBack(money) {
    for (let i = this.walletMoney.length - 1; i >= 0; i--) {
      if (money === 0) break;
      const changeCount = Math.floor(money / this.walletMoney[i].type);
      this.walletMoney[i].count += changeCount;
      money -= this.walletMoney[i].type * changeCount;
    }
    this.notify(); //wallet rendering
  }
  getTotalMoney() {
    return this.walletMoney.reduce((acc, curr) => acc + curr.type * curr.count, 0);
  }
}

export default WalletModel;
