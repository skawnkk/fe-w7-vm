import WalletModel from './model/walletModel';
import ProductModel from './model/productModel';
import ProcessModel from './model/processModel';
import ProductView from './view/productView';
import WalletView from './view/walletView';
import ProcessView from './view/processView';
import { myMoney, beverage } from './dataSetting';
import LogModel from './model/logModel';
import LogView from './view/logView';

const walletModel = new WalletModel(myMoney);
const productModel = new ProductModel(beverage);
const processModel = new ProcessModel();
const logModel = new LogModel();

const processView = new ProcessView({ walletModel, processModel, productModel, logModel });
const productView = new ProductView({ walletModel, processModel, productModel, logModel });
const walletView = new WalletView({ walletModel, processModel, logModel });
const logView = new LogView({ logModel });
