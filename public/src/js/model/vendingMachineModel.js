import Observable from '../observer';

class VendingModel extends Observable {
  constructor(product) {
    super();
    this.product = product;
    this.vendingMoney = 0;
    this.vendingStatus = [];
    this._returnObservers = new Set();
    this._productObservers = new Set();
  }
  subscribe(observers, observer) {
    observers.add(observer);
  }
  notify(observers, data) {
    observers.forEach((observer) => observer(data));
  }
  getReturnObserver() {
    return this._returnObservers;
  }
  getProductObserver() {
    return this._productObservers;
  }
  getProduct() {
    return this.product;
  }
  setProduct(product) {
    this.product = product;
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

export default VendingModel;
