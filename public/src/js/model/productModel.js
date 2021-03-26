import Observable from '../observer';

class ProductModel extends Observable {
  constructor(products) {
    super();
    this.products = products;
  }
  getProduct() {
    return this.products;
  }
  getTargetProduct(name) {
    for (const item of this.products) {
      if (item.name === name) return item;
    }
  }
  setStockMinus(productInfomation) {
    this.products = this.products.map((item) => {
      if (productInfomation.name === item.name && item.stock > 0) item.stock--;
      return item;
    });
    if (productInfomation.stock === 0) this.notify();
  }
}

export default ProductModel;
