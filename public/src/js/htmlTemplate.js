import { createDom } from './util/util.js';
export const walletStatus = () => {
   makeDiv(renderWallet)
}

const makeDiv = createDom('div')
const makeSpan = createDom('span');

export const renderWalletTpl = (moneyType, count) => {
   if (count === 0) {
      const walletMoney = makeDiv({
            value: `${moneyType}원`,
            classes: ['wallet__money-type', 'disabled']
         }) +
         makeDiv({
            value: count,
            classes: ['wallet__type-count']
         });

      return makeDiv({
         value: walletMoney
      })

   }
   const walletMoney = makeDiv({
         value: `${moneyType}원`,
         classes: ['wallet__money-type']
      }) +
      makeDiv({
         value: count,
         classes: ['wallet__type-count']
      });

   return makeDiv({
      value: walletMoney
   })
};

export const totalWalletTpl = (totalPrice) => {
   return makeDiv({
      value: `${totalPrice}원`,
      classes: ['wallet__total-money']
   })
}


export const getMonitorMoneyHTML = (price) =>
  makeSpan({ value: price, classes: ['monitor-money__price'] }) + makeSpan({ value: '원' });

export const getMonitorStatusHTML = (status) =>
  makeDiv({ value: status, classes: ['monitor-status__line'] });
