import { _ } from '../util/util.js';
import { renderWalletTpl, totalWalletTpl } from '../htmlTemplate.js';

class WalletView {
  constructor({ walletModel, processModel, logModel }) {
    this.walletModel = walletModel;
    this.processModel = processModel;
    this.logModel = logModel;
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
    const money = this.getPriceFromTarget(target); //타겟 el로부터 money 가져오기
    this.walletModel.setWalletMoneyMinus(money); //지갑돈 --
    this.processModel.updateVendingMoney({ money, plue: true }); //process 돈 ++
    this.logModel.setLog({ value: money, type: 'moneyInsert' });
    this.processModel.startTimer(this.returnMoney.bind(this)); //5초 타이머 재설정
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
    const totalMoney = this.walletModel.getWalletTotalMoney();
    const TotalMoneyTpl = totalWalletTpl(totalMoney);
    this.walletArea.innerHTML += TotalMoneyTpl;
  }
  isMoneyBtn(target) {
    return target === target.closest('.wallet__money-type');
  }
  returnMoney() {
    const money = this.processModel.getVendingMoney();
    this.walletModel.setWalletMoneyPlus(money);
    this.processModel.updateVendingMoney({ money, plus: false });
    this.logModel.setLog({ value: money, type: 'moneyReturn' });
  }
}

export default WalletView;
