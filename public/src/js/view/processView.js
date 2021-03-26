import { getMonitorMoneyHTML, getMonitorStatusHTML } from '../htmlTemplate';
import WalletModel from '../model/walletModel';
import { _ } from '../util/util.js';

class ProcessView {
  constructor({ walletModel, productModel, processModel, logModel }) {
    this.walletModel = walletModel;
    this.productModel = productModel;
    this.processModel = processModel;
    this.logModel = logModel;
    this.processMoneyArea = _.$('.process-money');
    this.processReturnBtn = _.$('.process-btn');
    this.init();
  }
  init() {
    this.render();
    this.addEvent();
    this.processModel.subscribe(this.render.bind(this));
  }
  addEvent() {
    _.addEvent(this.processReturnBtn, 'click', this.handleClick.bind(this));
  }
  handleClick() {
    const money = this.processModel.getVendingMoney();
    this.walletModel.setReturnMoneyBack(money); //wallet에 돈 ++
    this.processModel.updateVendingMoney({ money, plus: false }); //자판기 돈 --
    this.logModel.setLog({ value: money, type: 'moneyReturn' });
  }
  render() {
    const vendingMoney = this.processModel.getVendingMoney();
    const monitorMoneyHTML = getMonitorMoneyHTML(vendingMoney);
    this.processMoneyArea.innerHTML = monitorMoneyHTML;
  }
}

export default ProcessView;
