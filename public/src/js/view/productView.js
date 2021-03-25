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
    this.processModel.subscribe(this.render.bind(this));
    this.productModel.subscribe(this.render.bind(this));
  }
  addEvent() {
    _.addEvent(this.vendingMenuArea, 'click', this.handleClick.bind(this));
  }
  handleClick({ target }) {
    if (!this.isChoiceableTarget(target)) return;
    this.processModel.startTimer(this.returnMoney.bind(this)); //5초 타이머 재설정
    const choiceProduct = target.closest('.product-item').firstElementChild.innerHTML; //타겟으로부터 상품 이름가져오기
    const productInfomation = this.productModel.getProductItem(choiceProduct); //상품이름으로 infomation 가져오기
    this.processModel.productClickFn(productInfomation); //상품 클릭시 process에서 일어나는 일 (돈-- & 상품선택됐습니다 로그)
    this.productModel.minusStock(productInfomation); //상품 모델 재고 --
    this.processModel.setProductOutStatus(productInfomation); //2초 뒤,  상품이 나옵니다.
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
  isChoiceable(price, vendingMoney) {
    return price <= vendingMoney;
  }
  isChoiceableTarget(target) {
    const parentTarget = target.closest('.product-item');
    return parentTarget.classList.contains('choiceable');
  }
  returnMoney() {
    const money = this.processModel.getVendingMoney();
    this.walletModel.setReturnMoneyBack(money);
    this.processModel.processClickFn(money);
  }
}

export default ProductView;
