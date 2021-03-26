import { getLogHTML } from '../htmlTemplate';
import { _ } from '../util/util';

class LogView {
  constructor({ logModel }) {
    this.logModel = logModel;
    this.logArea = _.$('.process-status');
    this.init();
  }
  init() {
    this.render();
    this.logModel.subscribe(this.render.bind(this));
  }
  render() {
    const log = this.logModel.getLog();
    const logHTML = log.reduce((acc, info) => acc + getLogHTML(this.getSwitchLog(info)), '');
    this.logArea.innerHTML = logHTML;
  }
  getSwitchLog({ value, type }) {
    switch (type) {
      case 'moneyInsert':
        return `${value}원이 투입됐음`;
      case 'moneyReturn':
        return `잔돈 ${value}원이 반환됐음`;
      case 'productSelect':
        return `${value.name} 선택됨`;
      case 'productOut':
        return `${value.name} 나옴`;
    }
  }
}

export default LogView;
