import { getMonitorMoneyHTML, getMonitorStatusHTML } from '../htmlTemplate';
import WalletModel from '../model/walletModel';
import { _ } from '../util/util';

class MonitorView {
  constructor({ walletModel, vendingModel }) {
    this.walletModel = walletModel;
    this.vendingModel = vendingModel;
    this.monitorMoneyArea = _.$('.monitor-money');
    this.monitorStatusArea = _.$('.monitor-status');
    this.monitorBtn = _.$('.monitor-btn');
    this.maxStatus = 10;
    this.init();
  }
  init() {
    this.render();
    this.addEvent();
    const returnObserver = this.vendingModel.getReturnObserver();
    this.walletModel.subscribe(this.walletClickCbFn.bind(this));
    this.vendingModel.subscribe(returnObserver, this.returnClickCbFn.bind(this));
    //vending machine에 반환 옵저버에 subsribe - returnClickCbFn
    //vending machine에 vending 옵저버에 subscribe - vendingClickCbFn
  }
  addEvent() {
    this.monitorBtn.addEventListener('click', this.handleClick.bind(this));
  }
  render() {
    this.renderVendingMoney();
    this.renderVendingStatus();
  }
  handleClick() {
    const vendingMoney = this.vendingModel.getVendingMoney();
    const returnObserver = this.vendingModel.getReturnObserver();
    this.vendingModel.notify(returnObserver, vendingMoney);
  }
  walletClickCbFn(money) {
    this.updateVendingMoney({ money, plus: true });
    this.setPlusMoneyStatus(money);
    this.render();
  }
  returnClickCbFn(money) {
    this.updateVendingMoney({ money, plus: false });
    this.setReturnStatus(money);
    this.render();
  }
  vendingClickCbFn(food) {
    const foodItem = this.vendingModel.getFoodItem(food);
    this.updateVendingMoney({ money: foodItem.price, plus: false });
    this.setFoodStatus(food);
    this.render();
  }
  renderVendingMoney() {
    const vendingMoney = this.vendingModel.getVendingMoney();
    const monitorMoneyHTML = getMonitorMoneyHTML(vendingMoney);
    this.monitorMoneyArea.innerHTML = monitorMoneyHTML;
  }
  renderVendingStatus() {
    const vendingStatus = this.vendingModel.getVendingStatus();
    const statusHTML = vendingStatus.reduce((acc, curr) => acc + getMonitorStatusHTML(curr), '');
    this.monitorStatusArea.innerHTML = statusHTML;
  }
  updateVendingMoney({ money, plus = true }) {
    const vendingMoney = this.vendingModel.getVendingMoney();
    const newVendingMoney = plus ? vendingMoney + money : vendingMoney - money;
    this.vendingModel.setVendingMoney(newVendingMoney);
  }
  setPlusMoneyStatus(money) {
    const vendingStatus = this.vendingModel.getVendingStatus();
    if (vendingStatus.length > this.maxStatus) this.vendingModel.clearVendingStatus();
    const plusMoneyStatus = `${money}원이 투입됐음`;
    this.vendingModel.setVendingStatus(plusMoneyStatus);
  }
  setReturnStatus(money) {
    const vendingStatus = this.vendingModel.getVendingStatus();
    if (vendingStatus.length > this.maxStatus) this.vendingModel.clearVendingStatus();
    const returnStatus = `잔돈 ${money}원이 반환됐음`;
    this.vendingModel.setVendingStatus(returnStatus);
  }
  setFoodStatus(food) {
    const vendingStatus = this.vendingModel.getVendingStatus();
    if (vendingStatus.length > this.maxStatus) this.vendingModel.clearVendingStatus();
    const foodStatus = `${food}가 선택됨`;
    this.vendingModel.setVendingStatus(foodStatus);
  }
}

export default MonitorView;
