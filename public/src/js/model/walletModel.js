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
    const distrubutedMoney = this.distributeMoney(money);
    this.walletMoney = this.walletMoney.map((el) => {
      el.count += distrubutedMoney[el.type];
      return el;
    });
    this.notify(); //옵저버 호출
  }
  distributeMoney(money) {
    const moneyType = this.walletMoney.map((el) => el.type).reverse();
    const distrubuted = {};
    moneyType.forEach((moneyType) => {
      const changeCount = Math.floor(money / moneyType);
      distrubuted[moneyType] = changeCount;
      money -= moneyType * changeCount;
    });
    return distrubuted;
  }
  getTotalMoney() {
    return this.walletMoney.reduce((acc, curr) => acc + curr.type * curr.count, 0);
  }
}

export default WalletModel;
