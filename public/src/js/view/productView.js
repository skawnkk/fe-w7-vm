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
    this.walletModel.subscribe(this.changeChoiceable.bind(this));
    const returnObserver = this.vendingModel.getReturnObserver();
    this.vendingModel.subscribe(returnObserver, this.changeChoiceable.bind(this));
  }
  render() {
    this.renderProducts();
  }
  renderProducts() {
    const productInfomations = this.vendingModel.getFood();
    const productHTML = productInfomations.reduce(
      (acc, { name, price }) => acc + getProductHTML(name, price),
      ''
    );
    this.vendingMenuArea.innerHTML = productHTML;
  }
  changeChoiceable() {
    this.vendingMenuItems.forEach((item) => {
      const price = parseInt(_.$('.product-item__price', item).innerHTML);
      const vendingMoney = this.vendingModel.getVendingMoney();
      if (vendingMoney >= price) item.classList.add('choiceable');
      else item.classList.remove('choiceable');
    });
  }
}

export default ProductView;
