import { _ } from '../util/util.js';
import { renderWalletTpl, totalWalletTpl } from '../htmlTemplate.js';

class WalletView {
  constructor({ walletModel, processModel }) {
    this.walletModel = walletModel;
    this.processModel = processModel;
    this.walletArea = _.$('.wallet');
    this.init();
  }
  init() {
    this.render();
    this.addEvent();
    this.walletModel.subscribe(this.render.bind(this));
  }
  addEvent() {
    _.addEvent(this.walletArea, 'click', this.handleClick.bind(this));
  }
  handleClick({ target }) {
    if (!this.isMoneyBtn(target)) return;
    this.processModel.startTimer(this.returnMoney.bind(this)); //5초 타이머 재설정
    const money = this.getPriceFromTarget(target); //타겟 el로부터 money 가져오기
    this.walletModel.setWalletStatusMinus(money); //지갑돈 --
    this.processModel.walletClickFn(money); //process 돈 ++ & 로그+
  }
  getPriceFromTarget(target) {
    return parseInt(target.innerText.slice(0, -1));
  }
  render() {
    this.renderWallet();
    this.renderTotalMoney();
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
  returnMoney() {
    const money = this.processModel.getVendingMoney();
    this.walletModel.setReturnMoneyBack(money);
    this.processModel.processClickFn(money);
  }
}

export default WalletView;
