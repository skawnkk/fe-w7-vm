import Observable from '../observer';
import { delay } from '../util/util';

class ProcessModel extends Observable {
  constructor() {
    super();
    this.vendingMoney = 0;
    this.timer = null;
  }
  getVendingMoney() {
    return this.vendingMoney;
  }
  updateVendingMoney({ money, plus = true }) {
    plus ? (this.vendingMoney += money) : (this.vendingMoney -= money);
    this.notify(); //프로세스 & 프로덕트 렌더링
  }
  startTimer(fn) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => fn(), 5000);
  }
}

export default ProcessModel;
