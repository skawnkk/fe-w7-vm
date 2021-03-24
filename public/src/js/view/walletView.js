import { _ } from '../util/util.js'
import { renderWalletTpl, totalWalletTpl } from '../htmlTemplate.js'

class WalletView {
  constructor({walletModel, vendingModel}) {
    this.walletModel = walletModel
    this.vendingModel = vendingModel
    this.totalMoney
    this.walletArea = _.$('.wallet')
    this.init()
  }
  init() {
    this.render()
    this.addEvent()
    const returnObserver = this.vendingModel.getReturnObserver();
    this.walletModel.subscribe(this.walletClickCbFn.bind(this))
    this.vendingModel.subscribe(returnObserver, this.returnCallbackFn.bind(this))
  }
  addEvent() {
    _.addEvent(this.walletArea,'click', this.handleClick.bind(this));
  }
  handleClick({ target }) {
    if (!this.isMoneyBtn(target)) return;
    const money = this.getPriceFromTarget(target)
    this.walletModel.notify(money)
  }
  getPriceFromTarget(target) {
    return parseInt(target.innerText.slice(0, -1));
  }
  walletClickCbFn(money) {
    this.setWalletStatusMinus(money)
    this.render()
  }
  render() {
    this.renderWallet()
    this.setTotalMoney()
    this.renderTotalMoney()
  }
  setWalletStatusMinus(money) {
    const walletMoney = this.walletModel.getWalletMoney()
    
    const newWalletMoney = walletMoney.map((moneyBtn) => {
      if (moneyBtn.type === money) moneyBtn.count--
      return moneyBtn;
    })
    this.walletModel.setWalletMoney(newWalletMoney)
  }
  returnCallbackFn(money){
    this.setReturnMoneyBack(money);
    this.render();
  }
  setReturnMoneyBack(money) {
    const walletMoney = this.walletModel.getWalletMoney();
    const distrubutedMoney = this.distributeMoney(money);
    const newWalletMoney = walletMoney.map((el) => {
      el.count += distrubutedMoney[el.type];
      return el;
    });
    this.walletModel.setWalletMoney(newWalletMoney);
  }

  distributeMoney(money) {
    const walletMoney = this.walletModel.getWalletMoney();
    const moneyType = walletMoney.map((el) => el.type).reverse();
    const distrubuted = {};
    moneyType.forEach((moneyType) => {
      const changeCount = Math.floor(money / moneyType);
      distrubuted[moneyType] = changeCount;
      money -= moneyType * changeCount;
    });
    return distrubuted;
  }

  setTotalMoney() {
    const walletMoney = this.walletModel.getWalletMoney()
    const totalMoney = walletMoney.reduce((acc, curr) => acc + curr.type * curr.count, 0)
    this.totalMoney = totalMoney
  }
  renderWallet() {
    const walletMoney = this.walletModel.getWalletMoney()
    const walletStatusTpl = walletMoney.reduce(
      (acc, curr) => acc + renderWalletTpl(curr.type, curr.count),
      ''
    )
    this.walletArea.innerHTML = walletStatusTpl
  }
  renderTotalMoney() {
    const TotalMoneyTpl = totalWalletTpl(this.totalMoney)
    this.walletArea.innerHTML += TotalMoneyTpl
  }
  isMoneyBtn(target) {
    return target === target.closest('.wallet__money-type')
  }


}

export default WalletView
