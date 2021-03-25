class MonitorView extends Observable {
  constructor() {
    super();
    this.vendingMoney = 0;
    this.vendingStatus = [];
  }
  getVendingMoney() {
    return this.vendingMoney;
  }
  setVendingMoney(money) {
    this.vendingMoney = money;
  }
  getVendingStatus() {
    return this.vendingStatus;
  }
  setVendingStatus(status) {
    this.vendingStatus.push(status);
  }
  clearVendingStatus() {
    this.vendingStatus = [];
  }
}

export default MonitorView;
