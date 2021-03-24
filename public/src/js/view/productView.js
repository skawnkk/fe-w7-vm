import { getProductHTML } from '../htmlTemplate';
import { _ } from '../util/util';

class ProductView {
  constructor({ walletModel, vendingModel }) {
    this.walletModel = walletModel;
    this.vendingModel = vendingModel;
    this.vendingMenuArea = _.$('.products');
    this.init();
  }
  init() {
    this.render();
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
}

export default ProductView;
