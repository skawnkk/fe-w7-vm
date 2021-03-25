import Observable from '../observer';
import { delay } from '../util/util';

class ProcessModel extends Observable {
  constructor() {
    super();
    this.vendingMoney = 0;
    this.vendingStatus = [];
    this.maxStatus = 10;
    this.timer = null;
  }
  getVendingMoney() {
    return this.vendingMoney;
  }
  getVendingStatus() {
    return this.vendingStatus;
  }
  walletClickFn(money) {
    this.updateVendingMoney({ money, plus: true });
    this.setPlusMoneyStatus(money);
    this.notify(); //프로세스 & 프로덕트 렌더링
  }
  processClickFn(money) {
    this.updateVendingMoney({ money, plus: false });
    this.setReturnStatus(money);
    this.notify(); //프로세스 & 프로덕트 렌더링
  }
  productClickFn(productInfomation) {
    this.updateVendingMoney({ money: productInfomation.price, plus: false });
    this.setFoodStatus(productInfomation.name);
    this.notify(); //프로세스 & 프로덕트 렌더링
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
  //2초뒤 상품이 나왔습니다 상태 설정 & 옵저버호출
  async setProductOutStatus(productInfomation) {
    await delay(2000);
    const productStatus = `${productInfomation.name}가 나왔습니다.`;
    this.vendingStatus.push(productStatus);
    this.notify();
  }
  startTimer(fn) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => fn(), 5000);
  }
}

export default ProcessModel;
