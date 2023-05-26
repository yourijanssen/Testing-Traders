import { DaoFund } from '../database/DaoFund';
import { DaoUser } from '../database/DaoUser';
import { Fund } from './fund';
import { DayTrader, Investor, StockTrader, Trader } from './trader';
import { Transaction } from './transaction';

export class TraderService {

    private traders: Trader[] = [];

    public constructor(private daoUser: DaoUser, private daoFund:DaoFund = new DaoFund()) {

    }

    public getTraderID(): Promise<number> {
        return this.daoUser.getTraderID();
    }

    public getAllTraderIDs(knownIds: number[]): Promise<number[]> {
        return this.daoUser.getAllTraderIDs(knownIds);
    }

    public getFundId(traderId: number): Promise<Number | void> {
        return this.daoUser.getFundIdForTrader(traderId);
    }

    public getFund(traderId: number): Promise<Fund | void> {
        return this.daoFund.getFundForTrader(traderId);
    }

    public getMetaData(traderId: number): Promise<number[] | void> {
        return this.daoUser.getMetaDataForTrader(traderId);
    }

    public async getTrader(traderId: number): Promise<Trader[] | void> {

        let fund: Fund = null;

        await this.getMetaData(traderId)
            .then(async metaData => {
                if (Number.isInteger(metaData[0])) {
                    await this.getFund(metaData[0] as number)
                        .then(result2 => {
                            fund = result2 as Fund;
                            if (metaData[1] == 1) {
                                this.traders.push(this.createDayTrader(traderId, fund));
                            } else if (metaData[1] == 2) {
                                this.traders.push(this.createStockTrader(traderId, fund));
                            } else {
                                this.traders.push(this.createInvestor(traderId, fund));
                            }
                        });
                }
            });

        return this.traders;
    }

    public async getTraders(): Promise<Trader[] | void> {

        let traderIds: number[] = [];

        let knowIds: number[] = [];

        for (let trader of this.traders) {
            knowIds.push(trader.getTraderId());
        }

        await this.getAllTraderIDs(knowIds)
            .then(result => {
                traderIds = result;
            });

        for (const traderId of traderIds) {
            await this.getTrader(traderId)
                .catch(error => {
                    console.log(error);
                })
        }

        return this.traders;
    }

    public async getTraderById(id: number): Promise<Trader> {

        let trader: Trader = null;
        this.traders.forEach(tmpTrader => {

            if (tmpTrader.getTraderId() == id) {
                trader = tmpTrader;
                return;
            }
        });

        try {
            if (trader == null) {
                await this.getTrader(id);
                if (this.traders.length > 0) {
                    trader = (this.traders[this.traders.length - 1].getTraderId() == id) ? this.traders[this.traders.length - 1] : trader;
                }
            }
        } catch (error) {
            console.log(error);
        }
        return trader;
    }

    public async doTransaction(traderId: number, amount: number): Promise<Transaction> {

        let transaction: Transaction = new Transaction();
        try {
            let trader = await this.getTraderById(traderId);
            transaction = trader.transaction(amount);
            if(transaction["_newBalance"] !== undefined) {
                let result = await this.daoFund.setBalance(trader.getFund());
                if(result == null) {
                    console.log("Error???");
                }
            }
        } catch (error) {
            console.log(error);
        };

        return transaction;
    }

    private createDayTrader(traderId: number, fund: Fund): DayTrader {

        let dayTrader: DayTrader = new DayTrader(fund);
        dayTrader.setTraderId(traderId);

        return dayTrader;
    }

    private createStockTrader(traderId: number, fund: Fund): StockTrader {

        let stockTrader: StockTrader = new StockTrader(fund);
        stockTrader.setTraderId(traderId);

        return stockTrader;
    }

    private createInvestor(traderId: number, fund: Fund): Investor {

        let investor: Investor = new Investor(fund);
        investor.setTraderId(traderId);

        return investor;
    }
} 