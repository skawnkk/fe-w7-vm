import Observable from '../observer';

class ProductModel extends Observable {
  constructor(products) {
    super();
    this.products = products;
  }
  getProduct() {
    return this.products;
  }
  minusStock(target) {
    this.products = this.products.map((item) => {
      if (target === item.name && item.stock > 0) item.stock--;
      return item;
    });
  }
}

export default ProductModel;
