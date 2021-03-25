import WalletModel from './model/walletModel';
import ProductModel from './model/productModel';
import ProcessModel from './model/processModel';
import ProductView from './view/productView';
import WalletView from './view/walletView';
import ProcessView from './view/processView';
import { myMoney, beverage } from './dataSetting';

const walletModel = new WalletModel(myMoney);
const productModel = new ProductModel(beverage);
const processModel = new ProcessModel();

const processView = new ProcessView({ walletModel, processModel, productModel });
const productView = new ProductView({ walletModel, processModel, productModel });
const walletView = new WalletView({ walletModel, processModel });
