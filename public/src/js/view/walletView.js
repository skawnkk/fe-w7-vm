import { _ } from '../util/util.js';
import { renderWalletTpl, totalWalletTpl } from '../htmlTemplate.js';

class WalletView {
  constructor({ walletModel, processModel }) {
    this.walletModel = walletModel;
    this.processModel = processModel;
    this.totalMoney;
    this.walletArea = _.$('.wallet');
    this.init();
  }
  init() {
    this.render();
    this.addEvent();
    this.walletModel.subscribe(this.walletClickCbFn.bind(this));
    this.processModel.subscribe(this.processCbFn.bind(this));
  }
  addEvent() {
    _.addEvent(this.walletArea, 'click', this.handleClick.bind(this));
  }
  handleClick({ target }) {
    if (!this.isMoneyBtn(target)) return;
    const money = this.getPriceFromTarget(target);
    this.walletModel.notify(money);
  }
  getPriceFromTarget(target) {
    return parseInt(target.innerText.slice(0, -1));
  }
  walletClickCbFn(money) {
    this.walletModel.setWalletStatusMinus(money);
    this.render();
  }
  render() {
    this.renderWallet();
    this.renderTotalMoney();
  }
  processCbFn(money) {
    this.walletModel.setReturnMoneyBack(money);
    this.render();
  }
  renderWallet() {
    const walletMoney = this.walletModel.getWalletMoney();
    const walletStatusTpl = walletMoney.reduce(
      (acc, curr) => acc + renderWalletTpl(curr.type, curr.count),
      ''
    );
    this.walletArea.innerHTML = walletStatusTpl;
  }
  renderTotalMoney() {
    const totalMoney = this.walletModel.getTotalMoney();
    const TotalMoneyTpl = totalWalletTpl(totalMoney);
    this.walletArea.innerHTML += TotalMoneyTpl;
  }
  isMoneyBtn(target) {
    return target === target.closest('.wallet__money-type');
  }
}

export default WalletView;
