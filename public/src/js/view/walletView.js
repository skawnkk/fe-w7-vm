class WalletView {
  constructor(walletModel) {
    this.walletModel = walletModel;
    this.first = document.querySelector('#first');
    this.init();
    console.log(this.first);
  }
  init() {
    this.walletModel.subscribe(this.sayWallet.bind(this));
    console.log(this.walletModel._observers);
    this.first.addEventListener('click', this.walletModel.notify.bind(this.walletModel));
  }
  sayWallet() {
    console.log('wallet');
  }
}

export default WalletView;
