import { Transaction } from "./transaction";

export class Fund {
    private balance: number = 0;
    private fundId: number;

    public setFundId(fundId: number): void {
        this.fundId = fundId;
    }

    public getFundId(): number {
        return this.fundId;
    }

    public doTransaction(amount: number): Transaction {
        let transaction: Transaction = new Transaction();
        transaction.oldBalance = this.balance;
        this.balance += amount;
        transaction.newBalance = this.balance;
        return transaction;
    }

    public getBalance(): number {
        return this.balance;
    }
}
