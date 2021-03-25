import Observable from '../observer';

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
  // plusVendingMoney(money) {
  //   this.setPlusMoneyStatus(money);
  //   this.updateVendingMoney({ money, plus: true });
  // }
  // returnVendingMoney() {
  //   this.returnMoneyBack(this.vendingMoney);
  //   this.updateVendingMoney({ money: this.vendingMoney, plus: false });
  // }
  // minusVendingMoney()
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
  returnMoneyBack(money) {
    const totalReturnMoney = this.vendingMoney;
    this.vendingMoney = 0;

    this.notify(totalReturnMoney);
  }
}

export default ProcessModel;
