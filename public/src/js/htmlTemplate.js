import {
   createDom
} from './utill';

export const walletStatus = () => {
   makeDiv(renderWallet)
}

const makeDiv = createDom('div')
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