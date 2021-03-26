import Observable from '../observer';
import { delay } from '../util/util';

class LogModel extends Observable {
  constructor() {
    super();
    this.log = [];
    this.maxLog = 10;
  }
  getLog() {
    return this.log;
  }
  setLog({ value, type }) {
    if (this.log.length > this.maxLog) this.log = [];
    this.log.push({ value, type });
    this.notify(); //로그뷰 만 구독중
  }
  //2초뒤 상품이 나왔습니다 상태 설정 & 옵저버호출
  async setDelayLog({ value, type }) {
    await delay(2000);
    this.log.push({ value, type });
    this.notify();
  }
}

export default LogModel;
