import WalletModel from './model/walletModel';
import MonitorView from './view/monitorView';
import ProductView from './view/productView';
import WalletView from './view/walletView';

console.log('hello');

const myWallet = new WalletModel();

const monitorView = new MonitorView(myWallet);
const productView = new ProductView(myWallet);
const walletView = new WalletView(myWallet);
