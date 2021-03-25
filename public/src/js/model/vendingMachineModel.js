import Observable from '../observer';

class ProductModel extends Observable {
  constructor(product) {
    super();
    this.product = product;
  }
  getProduct() {
    return this.product;
  }
  setProduct(product) {
    this.product = product;
  }
}

export default VendingModel;
