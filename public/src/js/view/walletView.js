import { _ } from '../utill.js'
import { renderWalletTpl, totalWalletTpl } from '../htmlTemplate.js'

class WalletView {
  constructor(walletModel) {
    this.walletModel = walletModel
    this.totalMoney
    this.walletArea = _.$('.wallet')
    this.init()
  }
  init() {
    this.render()
    this.addEvent()
    this.walletModel.subscribe(this.walletClickCbFn.bind(this))
  }
  addEvent() {
    this.walletArea.addEventListener('click', this.handleClick.bind(this))
  }
  handleClick({ target }) {
    if (!this.isMoneyBtn(target)) return;
    const money = this.getPriceFromTarget(target)
    this.walletModel.notify(money)
    
  }
  getPriceFromTarget(target) {
    return target.innerText.slice(0, -1) * 1
  }
  walletClickCbFn(money) {
    this.setWalletStatusMinus(money)
    this.render()
  }
  render() {
    this.renderWallet()
    this.setTotalMoney()
    this.renderTotalMoney()
  }
  setWalletStatusMinus(money) {
    const walletMoney = this.walletModel.getWalletMoney()
    walletMoney.forEach((moneyBtn) => {
      if (moneyBtn.type === money) moneyBtn.count--
    })
    this.walletModel.setWalletMoney(walletMoney)
  }
  setTotalMoney() {
    const walletMoney = this.walletModel.getWalletMoney()
    const totalMoney = walletMoney.reduce((acc, curr) => acc + curr.type * curr.count, 0)
    this.totalMoney = totalMoney
  }
  renderWallet() {
    const walletMoney = this.walletModel.getWalletMoney()
    const walletStatusTpl = walletMoney.reduce(
      (acc, curr) => acc + renderWalletTpl(curr.type, curr.count),
      ''
    )
    this.walletArea.innerHTML = walletStatusTpl
  }
  renderTotalMoney() {
    const TotalMoneyTpl = totalWalletTpl(this.totalMoney)
    this.walletArea.innerHTML += TotalMoneyTpl
  }
  isMoneyBtn(target) {
    return target === target.closest('.wallet__money-type')
  }
}

export default WalletView
