import WalletModel from '../model/walletModel';

class MonitorView {
  constructor(walletModel) {
    this.walletModel = walletModel;
    this.init();
  }
  init() {
    this.walletModel.subscribe(this.sayMonitor.bind(this));
    console.log(this.walletModel._observers);
  }
  sayMonitor() {
    console.log('monitor');
  }
}

export default MonitorView;
