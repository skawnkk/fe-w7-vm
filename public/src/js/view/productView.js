class ProductView {
  constructor(walletModel) {
    this.walletModel = walletModel;
    this.init();
  }
  init() {
    this.walletModel.subscribe(this.sayProduct.bind(this));
    console.log(this.walletModel._observers);
  }
  sayProduct() {
    console.log('product');
  }
}

export default ProductView;
