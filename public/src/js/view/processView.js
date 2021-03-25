import { getMonitorMoneyHTML, getMonitorStatusHTML } from '../htmlTemplate';
import WalletModel from '../model/walletModel';
import { _ } from '../util/util.js';

class ProcessView {
  constructor({ walletModel, productModel, processModel }) {
    this.walletModel = walletModel;
    this.productModel = productModel;
    this.processModel = processModel;
    this.processMoneyArea = _.$('.process-money');
    this.processStatusArea = _.$('.process-status');
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
  render() {
    this.renderVendingMoney();
    this.renderVendingStatus();
  }
  handleClick() {
    const money = this.processModel.getVendingMoney();
    this.walletModel.setReturnMoneyBack(money); //wallet에 돈 ++
    this.processModel.processClickFn(money); //자판기 돈 -- & 로그 출력
  }
  renderVendingMoney() {
    const vendingMoney = this.processModel.getVendingMoney();
    const monitorMoneyHTML = getMonitorMoneyHTML(vendingMoney);
    this.processMoneyArea.innerHTML = monitorMoneyHTML;
  }
  renderVendingStatus() {
    const vendingStatus = this.processModel.getVendingStatus();
    const statusHTML = vendingStatus.reduce((acc, curr) => acc + getMonitorStatusHTML(curr), '');
    this.processStatusArea.innerHTML = statusHTML;
  }
}

export default ProcessView;
