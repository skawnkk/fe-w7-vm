import { getProductHTML } from '../htmlTemplate';
import { debounce, _ } from '../util/util';

class ProductView {
  constructor({ walletModel, processModel, productModel, logModel }) {
    this.walletModel = walletModel;
    this.processModel = processModel;
    this.productModel = productModel;
    this.logModel = logModel;
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
    this.resetTimer();
    this.processModel.startTimer(this.returnMoney.bind(this)); //5초 타이머 재설정
    const productInfomation = this.getProductInfomation(target);
    this.processModel.updateVendingMoney({ money: productInfomation.price, plus: false }); //자판기 돈 --
    this.logModel.setLog({ value: productInfomation, type: 'productSelect' });
    this.productModel.setStockMinus(productInfomation); //상품 모델 재고 --
    this.logModel.setDelayLog({ value: productInfomation, type: 'productOut' });
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
  getProductInfomation(target) {
    const choiceProduct = target.closest('.product-item').firstElementChild.innerHTML; //타겟으로부터 상품 이름가져오기
    const productInfomation = this.productModel.getTargetProduct(choiceProduct); //상품이름으로 infomation 가져오기
    return productInfomation;
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
    this.walletModel.setWalletMoneyPlus(money);
    this.processModel.updateVendingMoney({ money, plus: false });
    this.logModel.setLog({ value: money, type: 'moneyReturn' });
  }
}

export default ProductView;
