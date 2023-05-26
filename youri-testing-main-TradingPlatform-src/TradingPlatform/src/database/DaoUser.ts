import { pool } from "../Util/database";
import * as mysql from 'mysql2/promise';

export class DaoUser {

    public constructor() {
    }


    public async getTraderID(): Promise<number> {

        const trader = await pool.query<mysql.RowDataPacket[]>('SELECT * FROM trader');

        return trader[0][0]['fundId'];
    }

    public async getAllTraderIDs(knownIds: number[]): Promise<number[]> {

        let ids: number[] = [];
        try {
            let trader = null;
            if (knownIds.length == 0) {
                trader = await pool.query<mysql.RowDataPacket[]>('SELECT * FROM startingpoint.trader;');
            } else {
                trader = await pool.query<mysql.RowDataPacket[]>('SELECT * FROM startingpoint.trader WHERE traderId NOT IN (?);', [knownIds]);
            }
            for (const element in trader[0]) {
                ids.push(trader[0][element]['traderId']);
                this.getFundIdForTrader(ids[0]);
            }

        } catch (error) {
            console.log(error);
        }

        return ids;
    }

    public  async getFundIdForTrader(traderId: number): Promise<number | void> {

        let queryResult = null;
        try {
            queryResult = await pool.query<mysql.RowDataPacket[]>('SELECT * FROM `trader` where traderId =' + traderId);
            return queryResult[0][0]['fundId'];
        } catch (error) {
            console.log(error);
        }
        return queryResult;
    }

    public async getMetaDataForTrader(traderId: number): Promise<number[] | void> {

        let queryResult = null;
        try {
            queryResult = await pool.query<mysql.RowDataPacket[]>('SELECT * FROM `trader` where traderId =' + traderId);
            return [queryResult[0][0]['fundId'], queryResult[0][0]['traderType']];
        } catch (error) {
            console.log(error);
        }
        return queryResult;
    }
}