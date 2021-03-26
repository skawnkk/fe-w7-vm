import { createDom } from './util/util.js';

export const walletStatus = () => {
  makeDiv(renderWallet);
};

const makeDiv = createDom('div');
const makeSpan = createDom('span');

export const renderWalletTpl = (moneyType, count) => {
  if (count === 0) {
    const walletMoney =
      makeDiv({
        value: `${moneyType}원`,
        classes: ['wallet__money-type', 'disabled'],
      }) +
      makeDiv({
        value: count,
        classes: ['wallet__type-count'],
      });

    return makeDiv({
      value: walletMoney,
    });
  }
  const walletMoney =
    makeDiv({
      value: `${moneyType}원`,
      classes: ['wallet__money-type'],
    }) +
    makeDiv({
      value: count,
      classes: ['wallet__type-count'],
    });

  return makeDiv({
    value: walletMoney,
  });
};

export const totalWalletTpl = (totalPrice) => {
  return makeDiv({
    value: `${totalPrice}원`,
    classes: ['wallet__total-money'],
  });
};

export const getMonitorMoneyHTML = (price) =>
  makeSpan({ value: price, classes: ['monitor-money__price'] }) + makeSpan({ value: '원' });

export const getLogHTML = (log) => makeDiv({ value: log, classes: ['monitor-status__line'] });

export const getProductHTML = (productName, productPrice, productStock, isAvailable) => {
  const product = makeDiv({ value: productName, classes: ['product-item__title'] });
  const price = makeDiv({ value: productPrice, classes: ['product-item__price'] });
  const productInfomation = product + price;

  if (productStock === 0)
    return makeDiv({ value: productInfomation, classes: ['product-item', 'unchoiceable'] });
  else
    return makeDiv({
      value: productInfomation,
      classes: ['product-item', isAvailable ? 'choiceable' : ''],
    });
};
