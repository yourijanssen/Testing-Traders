import { Fund } from './fund';
import { Transaction } from './transaction';

export abstract class Trader {
    protected fund: Fund;
    protected traderId: number;

    abstract transaction(amount:number):Transaction

    abstract getBalance():number;

    public setTraderId(traderId: number): void {
        this.traderId = traderId;
    }

    public getTraderId(): number {
        return this.traderId;
    }

    public getFund():Fund {
        return this.fund;
    }
}

export class DayTrader extends Trader {

    public constructor(fund: Fund) {
        super();
        this.fund = fund;
    }

    public transaction(amount: number): Transaction {
        let transaction:Transaction = null;
        if(amount >= 2000 && amount <= 200000)
        {
            transaction = this.fund.doTransaction(amount);
        }

        if(amount >= -2000 && amount <= -1000)
        {
            transaction = this.fund.doTransaction(amount);
        }

        if(transaction == null) {
            transaction = new Transaction();
        }
        transaction.traderId = this.traderId;
        return transaction;
    }

    public getBalance():number
    {
        return this.fund.getBalance();
    }
}

export class StockTrader extends Trader {

    public constructor(fund: Fund) {
        super();
        this.fund = fund;
    }

    public transaction(amount: number): Transaction {
        let transaction:Transaction = null;
        if(amount >= 500 && amount <= 2000)
        {
            transaction = this.fund.doTransaction(amount);
        }

        if(amount >= -2000 && amount <= -500)
        {
            transaction = this.fund.doTransaction(amount);
        }

        if(transaction == null) {
            transaction = new Transaction();
        }
        transaction.traderId = this.traderId;

        return transaction;
    }

    public getBalance():number
    {
        return this.fund.getBalance();
    }
}

export class Investor extends Trader {

    public constructor(fund: Fund) {
        super();
        this.fund = fund;
    }

    public transaction(amount: number): Transaction {
        let transaction:Transaction = null;
        if(amount >= 50000)
        {
            transaction = this.fund.doTransaction(amount);
        }

        if(amount < 0 && (-1*amount) < this.fund.getBalance()*0.5)
        {
            transaction = this.fund.doTransaction(amount);
        }
        if(transaction == null) {
            transaction = new Transaction();
        }
        transaction.traderId = this.traderId;
        return transaction;
    }

    public getBalance():number
    {
        return this.fund.getBalance();
    }
}