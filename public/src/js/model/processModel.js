import Observable from '../observer';
import { delay } from '../util/util';

class ProcessModel extends Observable {
  constructor() {
    super();
    this.vendingMoney = 0;
    this.vendingStatus = [];
    this.maxStatus = 10;
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
  updateVendingMoney({ money, plus = true }) {
    plus ? (this.vendingMoney += money) : (this.vendingMoney -= money);
  }
  setPlusMoneyStatus(money) {
    if (this.vendingStatus.length > this.maxStatus) this.vendingStatus = [];
    const plusMoneyStatus = `${money}원이 투입됐음`;
    this.vendingStatus.push(plusMoneyStatus);
  }
  setReturnStatus(money) {
    if (this.vendingStatus.length > this.maxStatus) this.vendingStatus = [];
    const returnStatus = `잔돈 ${money}원이 반환됐음`;
    this.vendingStatus.push(returnStatus);
  }
  setFoodStatus(food) {
    if (this.vendingStatus.length > this.maxStatus) this.vendingStatus = [];
    const foodStatus = `${food}가 선택됨`;
    this.vendingStatus.push(foodStatus);
  }
  async setProductOutStatus(product) {
    await delay(2000);
    const productStatus = `${product}가 나왔습니다.`;
    this.vendingStatus.push(productStatus);
  }
  returnMoneyBack(money) {
    const totalReturnMoney = this.vendingMoney;
    this.vendingMoney = 0;

    this.notify(totalReturnMoney);
  }
}

export default ProcessModel;
