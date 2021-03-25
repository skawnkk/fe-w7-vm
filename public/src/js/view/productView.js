import { getProductHTML } from '../htmlTemplate';
import { _ } from '../util/util';

class ProductView {
  constructor({ walletModel, vendingModel }) {
    this.walletModel = walletModel;
    this.vendingModel = vendingModel;
    this.vendingMenuArea = _.$('.products');
    this.init();
    this.vendingMenuItems = _.$All('.product-item');
  }
  init() {
    this.render();
    this.addEvent();
    this.walletModel.subscribe(this.changeChoiceable.bind(this));
    const returnObserver = this.vendingModel.getReturnObserver();
    this.vendingModel.subscribe(returnObserver, this.changeChoiceable.bind(this));
    const productObserver = this.vendingModel.getProductObserver();
    this.vendingModel.subscribe(productObserver, this.productClickCbFn.bind(this));
  }
  addEvent() {
    _.addEvent(this.vendingMenuArea, 'click', this.handleClick.bind(this));
  }
  handleClick({ target }) {
    const choiceProduct = target.closest('.product-item').firstElementChild.innerHTML;
    this.minusStock(choiceProduct);
    this.render();
    this.changeChoiceable();
  }
  render() {
    this.renderProducts();
    this.vendingMenuItems = _.$All('.product-item');
  }
  renderProducts() {
    const productInfomations = this.vendingModel.getProduct();
    const productHTML = productInfomations.reduce(
      (acc, { name, price, stock }) => acc + getProductHTML(name, price, stock),
      ''
    );
    this.vendingMenuArea.innerHTML = productHTML;
  }
  productClickCbFn(target) {
    this.minusStock(target);
    this.render();
  }
  minusStock(target) {
    const productItems = this.vendingModel.getProduct();
    const newProductItems = productItems.map((item) => {
      if (target === item.name) item.stock--;
      return item;
    });
    this.vendingModel.setProduct(newProductItems);
  }
  changeChoiceable() {
    this.vendingMenuItems.forEach((item) => {
      const price = parseInt(_.$('.product-item__price', item).innerHTML);
      const vendingMoney = this.vendingModel.getVendingMoney();
      if (vendingMoney >= price) item.classList.add('choiceable');
      else item.classList.remove('choiceable');
    });
  }
  // changeChoiceable() {
  //   this.vendingMenuItems.forEach((item) => {
  //     const price = parseInt(_.$('.product-item__price', item).innerHTML);
  //     const vendingMoney = this.vendingModel.getVendingMoney();
  //     if (vendingMoney >= price) item.classList.add('choiceable');
  //     else item.classList.remove('choiceable');
  //   });
  // }
}

export default ProductView;
