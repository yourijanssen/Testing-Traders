import { Trader } from '../models/trader';
import { TraderService } from '../models/traderService';
import { Transaction } from '../models/transaction';

export class TraderController {

    public constructor(private traderService: TraderService) {

    }

    public async getTraders(req, res): Promise<any> {
        let traders: Trader[] = [];

        try {
            traders = await this.traderService.getTraders() as Trader[];
            res.status(200).json(traders);
        } catch (error) {
            res.status(404).json({});
        }
    }

    public async getTrader(req, res): Promise<any> {
        const traderId:number = +(req.params.id as number);

        let trader;
        try {
            trader = await this.traderService.getTraderById(traderId);
            res.status(200).json(trader);
        } catch (error) {
            res.status(404).json({});
        }
    }

    public async doTransaction(req, res): Promise<any> {

        const traderId:number = +(req.params.id as number);
        const amount:number = +(req.params.amount as number);

        let transaction: Transaction = null;;
        try {
            transaction = await this.traderService.doTransaction(traderId, amount);
            res.status(200).json(transaction);
        } catch (error) {
            res.status(404).json({});
        }
    }
}
