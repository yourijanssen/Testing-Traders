export class Transaction {
    private _traderId: number;
    private _oldBalance: number;
    private _newBalance: number;
    private _date: string;

    public getDate(): string {
        return this._date;
    }

    public setDate():void {
        let dateObj = new Date();
        this._date = dateObj.toDateString();
    }

    public get traderId(): number {
        return this._traderId;
    }

    public set traderId(value: number) {
        this._traderId = value;
    }

    public get oldBalance(): number {
        return this._oldBalance;
    }

    public set oldBalance(value: number) {
        this._oldBalance = value;
    }

    public get newBalance(): number {
        return this._newBalance;
    }

    public set newBalance(value: number) {
        this._newBalance = value;
    }
}