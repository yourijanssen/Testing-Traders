import { pool } from "../Util/database";
import { Fund } from "../models/fund";
import * as mysql from 'mysql2/promise';

export class DaoFund {

    public constructor() {
    }


    public async setBalance(fund:Fund): Promise<Fund> {

        try {
            const result = await pool.execute('UPDATE fund SET balance = ? WHERE fundId = ?', 
                [fund.getBalance(), fund.getFundId()]);
            return fund;
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    public async getFundForTrader(fundId: number | void): Promise<void | Fund> {
        let fund: void | Fund = null;
        await pool.query<mysql.RowDataPacket[]>('SELECT * FROM `fund` where fundId =' + fundId)
            .then(([rows, fields]) => {
                rows.forEach(async elementFund => {//TODO for...of loop
                    fund = new Fund();
                    fund.setFundId(elementFund['fundId']);
                    fund.doTransaction(elementFund['balance']);
                });
            })
            .catch(error => {
                console.log(error);
            });
        return fund;
    }
}