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
    this.walletModel.subscribe(this.walletClickCbFn.bind(this));
    this.productModel.subscribe(this.productClickCbFn.bind(this));
    this.processModel.subscribe(this.processCbFn.bind(this));
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
    this.processModel.notify(money);
    // this.processModel.setReturnStatus();
    // const vendingMoney = this.processModel.getVendingMoney();
  }
  walletClickCbFn(money) {
    this.processModel.updateVendingMoney({ money, plus: true });
    this.processModel.setPlusMoneyStatus(money);
    this.render();
  }
  processCbFn(money) {
    this.processModel.updateVendingMoney({ money, plus: false });
    this.processModel.setReturnStatus(money);
    this.render();
  }
  productClickCbFn(food) {
    const foodItem = this.processModel.getFoodItem(food);
    this.processModel.updateVendingMoney({ money: foodItem.price, plus: false });
    this.processModel.setFoodStatus(food);
    this.render();
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