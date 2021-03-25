import { getProductHTML } from '../htmlTemplate';
import { _ } from '../util/util';

class ProductView {
  constructor({ walletModel, processModel, productModel }) {
    this.walletModel = walletModel;
    this.processModel = processModel;
    this.productModel = productModel;
    this.vendingMenuArea = _.$('.products');
    this.init();
  }
  init() {
    this.render();
    this.addEvent();
    this.walletModel.subscribe(this.render.bind(this));
    this.processModel.subscribe(this.render.bind(this));
    this.productModel.subscribe(this.productCbFn.bind(this));
  }
  addEvent() {
    _.addEvent(this.vendingMenuArea, 'click', this.handleClick.bind(this));
  }
  handleClick({ target }) {
    const choiceProduct = target.closest('.product-item').firstElementChild.innerHTML;
    this.productModel.minusStock(choiceProduct);
    this.render();
  }
  render() {
    const productInfomations = this.productModel.getProduct();
    const vendingMoney = this.processModel.getVendingMoney();
    const productHTML = productInfomations.reduce((acc, { name, price, stock }) => {
      const isAvailable = this.isChoiceable(price, vendingMoney);
      return acc + getProductHTML(name, price, stock, isAvailable);
    }, '');
    this.vendingMenuArea.innerHTML = productHTML;
  }
  productCbFn(product) {
    this.minusStock(product);
    this.render();
  }
  isChoiceable(price, vendingMoney) {
    return price <= vendingMoney;
  }
}

export default ProductView;
